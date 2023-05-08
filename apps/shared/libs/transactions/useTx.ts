import { CreateTxOptions } from '@terra-money/feather.js';
import { useConnectedWallet, useLCDClient, ConnectedWallet, TxResult } from '@terra-money/wallet-provider';
import { useAsyncFn } from 'react-use';
import { useTransactionsContext } from '.';
import { addTxAction } from './actions';
import { FailedTransaction, TransactionPayload, TransactionStatus } from './types';
import { failedSubject } from './rx';
import { useRefCallback } from '../../hooks';

type TxOrFactory<Options> =
  | CreateTxOptions
  | ((options: Omit<Options, 'wallet'> & { wallet: ConnectedWallet }) => CreateTxOptions);

type PayloadOrFactory<Options> = TransactionPayload | ((options: Options) => TransactionPayload);

interface UseTxOptions {
  waitForCompletion?: boolean;
}

type TxError = Pick<FailedTransaction, 'error'> | any;

const useTx = <Options>(
  txOrFactory: TxOrFactory<Options>,
  payloadOrFactory: PayloadOrFactory<Options> = {},
  useTxOptions: UseTxOptions = { waitForCompletion: false }
) => {
  const [, dispatch] = useTransactionsContext();

  const lcd = useLCDClient();

  const wallet = useConnectedWallet();

  const txCallback = useRefCallback(
    async (options: Options) => {
      if (wallet === undefined || wallet.availablePost === false) {
        throw new Error('The wallet is not connected or is unable to post a message.');
      }

      const tx = typeof txOrFactory === 'function' ? txOrFactory({ ...options, wallet }) : txOrFactory;

      const payload = typeof payloadOrFactory === 'function' ? payloadOrFactory(options) : payloadOrFactory;

      let txResult: TxResult;
      try {
        txResult = await wallet.post(tx);
      } catch (error: TxError) {
        // if the tx fails here it means it didn't make it to the mempool
        failedSubject.next({
          txHash: '',
          status: TransactionStatus.Failed,
          payload,
          error,
        });
        throw error;
      }

      // NOTE: awaiting this dispatch means that the TX response that
      // is returned will actually complete once the tx has completed,
      // however we are displaying a pending operation status so
      // we really want the response to complete when the tx has been
      // submitted to the mempool
      const completion = dispatch(addTxAction(txResult.result.txhash, payload, lcd));

      if (useTxOptions.waitForCompletion) {
        await completion;
      }

      return txResult;
    },
    [lcd, wallet]
  );

  return useAsyncFn(txCallback);
};

export { useTx };

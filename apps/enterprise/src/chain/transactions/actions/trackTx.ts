import { LCDClient } from '@terra-money/feather.js';
import { TxState } from '../TxState';
import { find } from '../utils/find';
import { ActionType, TxDispatch, TxThunkArgument } from './types';
import { CancellationTokenSource } from 'chain/transactions/cancellation';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../types';
import { pollTx } from './pollTx';

const trackTx = async (
  txHash: string,
  lcd: LCDClient,
  dispatch: TxDispatch,
  getState: () => TxState,
  args: TxThunkArgument,
  chainID: string
) => {
  const notify = (subject: BehaviorSubject<Transaction>) => {
    const transaction = find(getState(), txHash);
    if (transaction) {
      subject.next(transaction);
    }
  };

  notify(args.pending);

  const cancellationToken = new CancellationTokenSource();

  // if the tx has been cancelled elsewhere in the
  // app then we can cancel the pending operation
  const unsubscribe = args.cancelled.subscribe((tx) => {
    if (tx.txHash === txHash) {
      cancellationToken.cancel();
    }
  });

  const txInfoOrError = await pollTx(lcd, txHash, cancellationToken, chainID);

  unsubscribe.unsubscribe();

  if (txInfoOrError instanceof Error) {
    dispatch({
      type: ActionType.Failed,
      payload: {
        txHash,
        error: txInfoOrError,
      },
    });
    notify(args.failed);
    return;
  }

  dispatch({
    type: ActionType.Complete,
    payload: {
      txHash,
      height: txInfoOrError.height,
      logs: txInfoOrError.logs ?? [],
    },
  });

  notify(args.completed);
};

export { trackTx };

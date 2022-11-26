import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';

interface ClaimTxOptions {
  daoAddress: string;
}

export const useClaimTx = () => {
  return useTx<ClaimTxOptions>(
    (options) => {
      const { daoAddress, wallet } = options;

      return TxBuilder.new().execute<enterprise.ExecuteMsg>(wallet.walletAddress, daoAddress, { claim: {} }).build();
    },
    {
      txKey: TX_KEY.CLAIM,
    }
  );
};

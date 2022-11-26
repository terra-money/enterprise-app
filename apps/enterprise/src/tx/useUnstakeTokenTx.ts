import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { u } from '@terra-money/apps/types';
import { BigSource } from 'big.js';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';

interface UnstakeTokenTxOptions {
  daoAddress: string;
  amount: u<BigSource>;
}

export const useUnstakeTokenTx = () => {
  return useTx<UnstakeTokenTxOptions>(
    (options) => {
      const { daoAddress, amount, wallet } = options;

      return TxBuilder.new()
        .execute<enterprise.ExecuteMsg>(wallet.walletAddress, daoAddress, {
          unstake: { cw20: { amount: amount.toString() } },
        })
        .build();
    },
    {
      txKey: TX_KEY.UNSTAKE_TOKEN,
    }
  );
};

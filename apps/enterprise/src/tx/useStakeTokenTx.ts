import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { u } from '@terra-money/apps/types';
import { BigSource } from 'big.js';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
import { useTxOverrides } from './useFeeOverrides';

interface StakeTokenTxOptions {
  daoAddress: string;
  tokenAddress: string;
  amount: u<BigSource>;
}

export const useStakeTokenTx = () => {
  const txOverrides = useTxOverrides();

  return useTx<StakeTokenTxOptions>(
    (options) => {
      const { daoAddress, tokenAddress, amount, wallet } = options;

      const tx = TxBuilder.new()
        .hook<enterprise.Cw20HookMsg>(wallet.walletAddress, daoAddress, tokenAddress, amount.toString(), { stake: {} })
        .build();

      return {
        ...txOverrides,
        ...tx,
      };
    },
    {
      txKey: TX_KEY.STAKE_TOKEN,
    }
  );
};

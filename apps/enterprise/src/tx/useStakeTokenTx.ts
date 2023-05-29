import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { u } from '@terra-money/apps/types';
import { BigSource } from 'big.js';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
import { useTxOverrides } from './useFeeOverrides';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { assertDefined } from '@terra-money/apps/utils';
import { useChainID } from '@terra-money/apps/hooks';

interface StakeTokenTxOptions {
  daoAddress: string;
  tokenAddress: string;
  amount: u<BigSource>;
}

export const useStakeTokenTx = () => {
  const txOverrides = useTxOverrides();

  const myAddress = useMyAddress();

  const chainID = useChainID();

  return useTx<StakeTokenTxOptions>(
    (options) => {
      const { daoAddress, tokenAddress, amount } = options;

      const payload = TxBuilder.new()
        .hook<enterprise.Cw20HookMsg>(assertDefined(myAddress), daoAddress, tokenAddress, amount.toString(), {
          stake: {},
        })
        .build();

      return {
        ...txOverrides,
        ...payload,
        chainID,
      };
    },
    {
      txKey: TX_KEY.STAKE_TOKEN,
    }
  );
};

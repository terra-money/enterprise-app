import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { assertDefined } from '@terra-money/apps/utils';
import { useChainID } from '@terra-money/apps/hooks';

interface UnstakeTokenTxOptions {
  daoAddress: string;
  amount: string;
}

export const useUnstakeTokenTx = () => {
  const myAddress = useMyAddress();
  const chainID = useChainID();

  return useTx<UnstakeTokenTxOptions>(
    (options) => {
      const { daoAddress, amount } = options;

      const payload = TxBuilder.new()
        .execute<enterprise.ExecuteMsg>(assertDefined(myAddress), daoAddress, {
          unstake: { cw20: { amount: amount.toString() } },
        })
        .build();

      return {
        ...payload,
        chainID,
      };
    },
    {
      txKey: TX_KEY.UNSTAKE_TOKEN,
    }
  );
};

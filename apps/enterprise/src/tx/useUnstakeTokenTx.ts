import { useTx, TxBuilder } from 'chain/transactions';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { useChainID } from 'chain/hooks/useChainID';

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

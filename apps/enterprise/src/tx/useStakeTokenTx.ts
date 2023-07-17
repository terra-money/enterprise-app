import { useTx, TxBuilder } from 'chain/transactions';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
import { useTxOverrides } from './useFeeOverrides';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { useChainID } from 'chain/hooks/useChainID';

interface StakeTokenTxOptions {
  daoAddress: string;
  tokenAddress: string;
  amount: string;
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

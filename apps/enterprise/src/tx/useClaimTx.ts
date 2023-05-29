import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { assertDefined } from '@terra-money/apps/utils';
import { useChainID } from '@terra-money/apps/hooks';

interface ClaimTxOptions {
  daoAddress: string;
}

export const useClaimTx = () => {
  const myAddress = useMyAddress();
  const chainID = useChainID();

  return useTx<ClaimTxOptions>(
    (options) => {
      const { daoAddress } = options;

      const payload = TxBuilder.new()
        .execute<enterprise.ExecuteMsg>(assertDefined(myAddress), daoAddress, { claim: {} })
        .build();

      return {
        ...payload,
        chainID,
      };
    },
    {
      txKey: TX_KEY.CLAIM,
    }
  );
};

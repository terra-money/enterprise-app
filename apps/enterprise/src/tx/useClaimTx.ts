import { useTx, TxBuilder } from 'chain/transactions';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { useChainID } from 'chain/hooks/useChainID';

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

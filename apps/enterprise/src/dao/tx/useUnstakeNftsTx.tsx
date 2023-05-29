import { useChainID } from '@terra-money/apps/hooks';
import { TxBuilder, useTx } from '@terra-money/apps/libs/transactions';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { TX_KEY } from 'tx';
import { enterprise } from 'types/contracts';

interface StakeNftTxParams {
  daoAddress: string;
  tokenIds: string[];
}

export const useUnstakeNftsTx = () => {
  const walletAddress = useAssertMyAddress();

  const chainID = useChainID();

  return useTx<StakeNftTxParams>(
    ({ daoAddress, tokenIds }: StakeNftTxParams) => {
      const payload = TxBuilder.new()
        .execute<enterprise.ExecuteMsg>(walletAddress, daoAddress, {
          unstake: { cw721: { tokens: tokenIds } },
        })
        .build();

      return {
        ...payload,
        chainID,
      };
    },
    {
      txKey: TX_KEY.UNSTAKE_NFT,
    }
  );
};

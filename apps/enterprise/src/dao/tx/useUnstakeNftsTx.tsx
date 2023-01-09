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

  return useTx<StakeNftTxParams>(
    ({ daoAddress, tokenIds }: StakeNftTxParams) => {
      return TxBuilder.new()
        .execute<enterprise.ExecuteMsg>(walletAddress, daoAddress, {
          unstake: { cw721: { tokens: tokenIds } },
        })
        .build();
    },
    {
      txKey: TX_KEY.UNSTAKE_NFT,
    }
  );
};

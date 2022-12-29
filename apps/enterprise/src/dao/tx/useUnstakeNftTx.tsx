import { TxBuilder, useTx } from '@terra-money/apps/libs/transactions';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { TX_KEY } from 'tx';
import { enterprise } from 'types/contracts';

interface StakeNftTxParams {
  daoAddress: string;
  tokenId: string;
}

export const useUnstakeNftTx = () => {
  const walletAddress = useAssertMyAddress();

  return useTx<StakeNftTxParams>(
    ({ daoAddress, tokenId }: StakeNftTxParams) => {
      return TxBuilder.new()
        .execute<enterprise.ExecuteMsg>(walletAddress, daoAddress, {
          unstake: { cw721: { tokens: [tokenId] } },
        })
        .build();
    },
    {
      txKey: TX_KEY.UNSTAKE_NFT,
    }
  );
};

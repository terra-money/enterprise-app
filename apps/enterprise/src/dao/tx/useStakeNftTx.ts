import { TxBuilder, useTx } from '@terra-money/apps/libs/transactions';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { TX_KEY } from 'tx';
import { enterprise } from 'types/contracts';

interface StakeNftTxParams {
  daoAddress: string;
  collectionAddress: string;
  tokenId: string;
}

export const useStakeNftTx = () => {
  const walletAddress = useAssertMyAddress();

  return useTx<StakeNftTxParams>(
    ({ daoAddress, collectionAddress, tokenId }: StakeNftTxParams) => {
      const builder = TxBuilder.new();

      return builder
        .sendNft<enterprise.Cw721HookMsg>(walletAddress, collectionAddress, daoAddress, tokenId, {
          stake: {},
        })
        .build();
    },
    {
      txKey: TX_KEY.STAKE_NFT,
    }
  );
};

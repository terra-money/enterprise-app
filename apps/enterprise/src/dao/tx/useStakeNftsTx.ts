import { useChainID } from '@terra-money/apps/hooks';
import { TxBuilder, useTx } from '@terra-money/apps/libs/transactions';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { TX_KEY } from 'tx';
import { enterprise } from 'types/contracts';

interface StakeNftTxParams {
  daoAddress: string;
  collectionAddress: string;
  tokenIds: string[];
}

export const useStakeNftsTx = () => {
  const walletAddress = useAssertMyAddress();

  const chainID = useChainID();

  return useTx<StakeNftTxParams>(
    ({ daoAddress, collectionAddress, tokenIds }: StakeNftTxParams) => {
      let builder = TxBuilder.new();

      tokenIds.forEach((tokenId) => {
        builder = builder.sendNft<enterprise.Cw721HookMsg>(walletAddress, collectionAddress, daoAddress, tokenId, {
          stake: {},
        });
      });

      return {
        ...builder.build(),
        chainID,
      };
    },
    {
      txKey: TX_KEY.STAKE_NFT,
    }
  );
};

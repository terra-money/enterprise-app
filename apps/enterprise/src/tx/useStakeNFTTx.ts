import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { NftInfo } from 'chain/queries/useNftInfoQuery';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';

interface StakeNFTTxOptions {
  daoAddress: string;
  tokenAddress: string;
  nfts: NftInfo[];
}

export const useStakeNFTTx = () => {
  return useTx<StakeNFTTxOptions>(
    (options) => {
      const { daoAddress, tokenAddress, nfts, wallet } = options;

      let builder = TxBuilder.new();

      nfts.forEach((nft) => {
        builder = builder.sendNft<enterprise.Cw721HookMsg>(
          wallet.walletAddress,
          tokenAddress,
          daoAddress,
          nft.tokenId,
          {
            stake: {},
          }
        );
      });

      return builder.build();
    },
    {
      txKey: TX_KEY.STAKE_NFT,
    }
  );
};

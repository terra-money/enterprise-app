import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { enterprise } from 'types/contracts';
import { TX_KEY } from './txKey';

interface StakeNFTTxOptions {
  daoAddress: string;
  tokenAddress: string;
  tokens: string[];
}

export const useStakeNFTTx = () => {
  return useTx<StakeNFTTxOptions>(
    (options) => {
      const { daoAddress, tokenAddress, tokens, wallet } = options;

      let builder = TxBuilder.new();

      tokens.forEach((tokenId) => {
        builder = builder.sendNft<enterprise.Cw721HookMsg>(wallet.walletAddress, tokenAddress, daoAddress, tokenId, {
          stake: {},
        });
      });

      return builder.build();
    },
    {
      txKey: TX_KEY.STAKE_NFT,
    }
  );
};

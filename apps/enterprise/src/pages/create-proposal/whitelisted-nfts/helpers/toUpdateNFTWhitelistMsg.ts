import { enterprise } from 'types/contracts';

export const toUpdateNFTWhitelistMsg = (initialNFTs: string[], newNFTs: string[]): enterprise.UpdateNftWhitelistMsg => {
  return {
    add: newNFTs.filter((nft) => !initialNFTs.includes(nft)),
    remove: initialNFTs.filter((nft) => !newNFTs.includes(nft)),
  };
};

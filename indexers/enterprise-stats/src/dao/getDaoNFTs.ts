import { contractQuery } from "chain/lcd"
import { enterprise, enterprise_factory } from "types/contracts";
import { Dao } from "./Dao";
import { NFT, NFTWithPrice } from "chain/NFT";
import { getNftIds } from "chain/getNftIds";
import { getNFTPrice } from "chain/getNFTPrice";
import { getSupportedNFTCollections } from "chain/getFloorPricesOfSupportedNFTCollections";

export const getDaoNFTs = async ({ address, enterpriseFactoryContract }: Pick<Dao, 'address' | 'enterpriseFactoryContract'>) => {
  const { nfts: globalWhitelist } = await contractQuery<enterprise_factory.NftWhitelistResponse>(enterpriseFactoryContract, { global_nft_whitelist: {}, });
  const { nfts: localWhitelist } = await contractQuery<enterprise.NftWhitelistResponse>(address, { nft_whitelist: {}, });
  const supportedCollections = await getSupportedNFTCollections()
  const whitelist = [...new Set([...globalWhitelist, ...localWhitelist])].filter(collection => supportedCollections.has(collection))

  const nfts: NFT[] = []
  await Promise.all(whitelist.map(async address => {
    const ids = await getNftIds({ collection: address, owner: address })
    nfts.push(...ids.map(id => ({ address, id })))
  }))

  const result: NFTWithPrice[] = []
  await Promise.all(nfts.map(async nft => {
    try {
      const usd = await getNFTPrice(nft)
      result.push({ ...nft, usd })
    } catch (error) {
      console.error(`Error getting price for NfT collection=${nft.address} id=${nft.id}`, error)
    }
  }))

  return result
}
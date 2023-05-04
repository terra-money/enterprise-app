import { getLCDClient } from "chain/lcd"
import { enterprise, enterprise_factory } from "types/contracts";
import { Dao } from "./Dao";
import { NFT, NFTWithPrice } from "chain/NFT";
import { getNftIds } from "chain/getNftIds";
import { getNFTPrice } from "chain/getNFTPrice";

export const getDaoNFTs = async ({ address, enterpriseFactoryContract }: Pick<Dao, 'address' | 'enterpriseFactoryContract'>) => {
  const lcd = getLCDClient()
  const { nfts: globalWhitelist } = await lcd.wasm.contractQuery<enterprise_factory.NftWhitelistResponse>(enterpriseFactoryContract, { global_nft_whitelist: {}, });
  const { nfts: localWhitelist } = await lcd.wasm.contractQuery<enterprise.NftWhitelistResponse>(address, { nft_whitelist: {}, });
  const whitelist = [...new Set([...globalWhitelist, ...localWhitelist])]

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
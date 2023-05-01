import { getLCDClient } from "chain/lcd"
import { enterprise, enterprise_factory } from "types/contracts";
import { Dao } from "./Dao";
import { NFT } from "chain/NFT";
import { getNftIds } from "chain/getNftIds";

export const getDaoNFTs = async ({ address, enterpriseFactoryContract }: Pick<Dao, 'address' | 'enterpriseFactoryContract'>) => {
  const lcd = getLCDClient()
  const { nfts: globalWhitelist } = await lcd.wasm.contractQuery<enterprise_factory.NftWhitelistResponse>(enterpriseFactoryContract, { global_nft_whitelist: {}, });
  const { nfts: localWhitelist } = await lcd.wasm.contractQuery<enterprise.NftWhitelistResponse>(address, { nft_whitelist: {}, });
  const whitelist = [...new Set([...globalWhitelist, ...localWhitelist])]

  const result: NFT[] = []
  await Promise.all(whitelist.map(async address => {
    const ids = await getNftIds({ collection: address, owner: address })
    result.push(...ids.map(id => ({ address, id })))
  }))

  return result
}
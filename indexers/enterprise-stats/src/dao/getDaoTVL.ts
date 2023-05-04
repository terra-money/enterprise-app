import { sum } from "shared/sum"
import { Dao } from "./Dao"
import { getDaoAssets } from "./getDaoAssets"
import { fromChainAmount } from "chain/fromChainAmount"
import { getDaoNFTs } from "./getDaoNFTs"
import { AssetWithPrice } from "chain/Asset"
import { getTokenDaoStakedAsset } from "./getTokenDaoStakedAsset"

export const getDaoTVL = async (dao: Pick<Dao, 'address' | 'membershipContractAddress' | 'enterpriseFactoryContract' | 'type'>) => {
  const assets: AssetWithPrice[] = [] // await getDaoAssets(dao)
  const nfts = [] // await getDaoNFTs(dao)

  if (dao.type === 'token') {
    const asset = await getTokenDaoStakedAsset(dao)
    assets.push(asset)
  } else if (dao.type === 'nft') {
    // get number of staked NFTs
    // get NFT collection price
  }

  return sum([
    ...assets.map(asset => fromChainAmount(asset.balance, asset.decimals) * asset.usd),
    ...nfts.map(nft => nft.usd)
  ])
}
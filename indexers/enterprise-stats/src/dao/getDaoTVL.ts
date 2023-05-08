import { sum } from "shared/sum"
import { Dao } from "./Dao"
import { getDaoAssets } from "./getDaoAssets"
import { fromChainAmount } from "chain/fromChainAmount"
import { getDaoNFTs } from "./getDaoNFTs"

export const getDaoTVL = async (dao: Pick<Dao, 'address' | 'membershipContractAddress' | 'enterpriseFactoryContract' | 'type'>) => {
  const assets = await getDaoAssets(dao)
  const assetsTvl = sum(assets.map(asset => fromChainAmount(asset.balance, asset.decimals) * asset.usd))

  const nfts = await getDaoNFTs(dao)
  const nftsTvl = sum(nfts.map(nft => nft.usd))

  return assetsTvl + nftsTvl
}
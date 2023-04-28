import { sum } from "shared/sum"
import { Dao } from "./Dao"
import { getDaoAssets } from "./getDaoAssets"
import { fromChainAmount } from "chain/fromChainAmount"

export const getDaoTVL = async (dao: Pick<Dao, 'address' | 'enterpriseFactoryContract'>) => {
  const assets = await getDaoAssets(dao)

  const assetsTVL = sum(
    assets.map(asset => fromChainAmount(asset.balance, asset.decimals) * asset.usd)
  )

  return assetsTVL
}
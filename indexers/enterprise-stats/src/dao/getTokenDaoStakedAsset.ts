import { getAssetInfo } from "chain/getAssetInfo"
import { Dao } from "./Dao"
import { getTokenDaoStakedAmount } from "./getTokenDaoStakedAmount"
import { getAssetPrice } from "chain/getAssetPrice"
import { Asset, AssetWithPrice } from "chain/Asset"

export const getTokenDaoStakedAsset = async (dao: Pick<Dao, 'address' | 'membershipContractAddress' | 'enterpriseFactoryContract' | 'type'>) => {
  const asset: Asset = { id: dao.membershipContractAddress, type: 'cw20' }

  const { decimals } = await getAssetInfo(asset)
  const balance = await getTokenDaoStakedAmount(dao)
  let usd = 0
  try {
    usd = await getAssetPrice(asset)
  } catch (err) {
    // ignore DAO asset
  }

  const assetWithPrice: AssetWithPrice = {
    type: 'cw20',
    id: dao.membershipContractAddress,
    balance,
    decimals,
    usd
  }

  return assetWithPrice
}
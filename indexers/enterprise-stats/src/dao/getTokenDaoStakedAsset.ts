import { getAssetInfo } from "chain/getAssetInfo"
import { Dao } from "./Dao"
import { getDaoTotalStakedAmount } from "./getDaoTotalStakedAmount"
import { getAssetPrice } from "chain/getAssetPrice"
import { Asset, AssetWithPrice } from "chain/Asset"

export const getTokenDaoStakedAsset = async (dao: Pick<Dao, 'address' | 'membershipContractAddress'>) => {
  const asset: Asset = { id: dao.membershipContractAddress, type: 'cw20' }

  const { decimals } = await getAssetInfo(asset)
  const balance = await getDaoTotalStakedAmount(dao)
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
import { Asset } from './Asset'
import { getAssetsPrices } from './getAssetsPrices'

export const getAssetPrice = async (asset: Asset): Promise<number> => {
  const allPrices = await getAssetsPrices()

  const tokenInfo = allPrices[asset.id]

  return tokenInfo?.usd ?? 0
}
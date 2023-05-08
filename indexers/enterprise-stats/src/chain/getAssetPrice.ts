import { Asset } from './Asset'
import { getPricesOfLiquidAssets } from './getPricesOfLiquidAssets'

export const getAssetPrice = async (asset: Asset): Promise<number> => {
  const prices = await getPricesOfLiquidAssets()

  return prices[asset.id] || 0
}
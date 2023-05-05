import { Asset, AssetWithPrice } from "chain/Asset";
import { getAssetBalance } from "chain/getAssetBalance";
import { getAssetInfo } from "chain/getAssetInfo";
import { contractQuery } from "chain/lcd"
import { enterprise, enterprise_factory } from "types/contracts";
import { Dao } from "./Dao";
import { getAssetPrice } from "chain/getAssetPrice";

const toAsset = (response: enterprise.AssetInfoBaseFor_Addr): Asset | undefined => {
  if ('native' in response) {
    return {
      type: 'native',
      id: response.native,
    }
  } else if ('cw20' in response) {
    return {
      type: 'cw20',
      id: response.cw20,
    }
  }
}

export const getDaoAssets = async ({ address, enterpriseFactoryContract }: Pick<Dao, 'address' | 'enterpriseFactoryContract'>) => {
  const { assets: globalWhitelist } = await contractQuery<enterprise_factory.AssetWhitelistResponse>(enterpriseFactoryContract, { global_asset_whitelist: {}, });
  const { assets: assetsWhitelist } = await contractQuery<enterprise.AssetWhitelistResponse>(address, { asset_whitelist: {}, });
  const whitelist = [...new Set([...globalWhitelist, ...assetsWhitelist])]

  const assets: AssetWithPrice[] = []
  await Promise.all(whitelist.map(async response => {
    const asset = toAsset(response)
    if (!asset) return

    try {
      const balance = await getAssetBalance({ asset, address })
      const { decimals } = await getAssetInfo(asset)
      const usd = await getAssetPrice(asset)

      assets.push({
        ...asset,
        balance,
        decimals,
        usd
      })
    } catch (err) {
      console.error(`Failed to get asset info for ${asset.type} asset with id=${asset.id}: ${err}`)
    }
  }))

  return assets
}
import { Asset, AssetWithBalance } from "chain/Asset";
import { getAssetBalance } from "chain/getAssetBalance";
import { getAssetInfo } from "chain/getAssetInfo";
import { getLCDClient } from "chain/lcd"
import { enterprise, enterprise_factory } from "types/contracts";
import { Dao } from "./Dao";

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
  const lcd = getLCDClient()
  const { assets: globalWhitelist } = await lcd.wasm.contractQuery<enterprise_factory.AssetWhitelistResponse>(enterpriseFactoryContract, { global_asset_whitelist: {}, });
  const { assets: assetsWhitelist } = await lcd.wasm.contractQuery<enterprise.AssetWhitelistResponse>(address, { asset_whitelist: {}, });
  const whitelist = [...new Set([...globalWhitelist, ...assetsWhitelist])]

  const assets: AssetWithBalance[] = []
  await Promise.all(whitelist.map(async response => {
    const asset = toAsset(response)
    if (!asset) return

    try {
      const balance = await getAssetBalance({ asset, address })
      const { decimals } = await getAssetInfo(asset)

      assets.push({
        ...asset,
        balance,
        decimals,
      })
    } catch (err) {
      console.error(`Failed to get asset info for ${asset.type} asset with id=${asset.id}: ${err}`)
    }
  }))

  return assets
}
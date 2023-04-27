import { Asset, AssetWithBalance } from "chain/Asset";
import { getAssetBalance } from "chain/getAssetBalance";
import { getAssetInfo } from "chain/getAssetInfo";
import { getLCDClient } from "chain/lcd"
import { enterprise } from "types/contracts";

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

export const getDaoAssets = async (address: string) => {
  const lcd = getLCDClient()
  const { assets: assetsWhitelist } = await lcd.wasm.contractQuery<enterprise.AssetWhitelistResponse>(address, { asset_whitelist: {}, });

  const assets: AssetWithBalance[] = []
  await Promise.all(assetsWhitelist.map(async response => {
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
      console.error(`Failed to get asset info for ${asset.type} with id=${asset.id}: ${err}`)
    }
  }))

  return assets
}
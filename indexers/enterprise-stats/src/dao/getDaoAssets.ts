import { Asset, AssetWithPrice, areSameAsset } from "chain/Asset";
import { getAssetBalance } from "chain/getAssetBalance";
import { getAssetInfo } from "chain/getAssetInfo";
import { contractQuery } from "chain/lcd"
import { enterprise, enterprise_factory } from "types/contracts";
import { Dao } from "./Dao";
import { getAssetPrice } from "chain/getAssetPrice";
import { getDaoTotalStakedAmount } from "./getDaoTotalStakedAmount";
import Big from "big.js";

const toAsset = (response: enterprise.AssetInfoBaseFor_Addr | enterprise_factory.AssetInfoBaseFor_Addr): Asset | undefined => {
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

export const getDaoAssets = async ({ address, enterpriseFactoryContract, membershipContractAddress }: Pick<Dao, 'address' | 'enterpriseFactoryContract' | 'type' | 'membershipContractAddress'>) => {
  const { assets: globalWhitelist } = await contractQuery<enterprise_factory.AssetWhitelistResponse>(enterpriseFactoryContract, { global_asset_whitelist: {}, });
  const { assets: assetsWhitelist } = await contractQuery<enterprise.AssetWhitelistResponse>(address, { asset_whitelist: {}, });

  const whitelist = [];
  [...globalWhitelist, ...assetsWhitelist].forEach(item => {
    const asset = toAsset(item)
    if (asset && !whitelist.find(a => areSameAsset(a, asset))) {
      whitelist.push(asset)
    }
  })

  const assets: AssetWithPrice[] = []
  await Promise.all(whitelist.map(async asset => {
    let balance = '0'
    try {
      balance = await getAssetBalance({ asset, address })
      if (asset.id === membershipContractAddress) {
        const totalStakedAmount = await getDaoTotalStakedAmount({ address })
        balance = Big(balance).minus(totalStakedAmount).toString()
      }
    } catch (err) {
      console.error(`Failed to get balance of ${asset.type} asset with id=${asset.id}: ${err}`)
      return
    }

    let decimals = 6
    try {
      const info = await getAssetInfo(asset)
      decimals = info.decimals
    } catch (err) {
      console.error(`Failed to get asset info for ${asset.type} asset with id=${asset.id}: ${err}`)
      return
    }

    let usd = 0
    try {
      usd = await getAssetPrice(asset)
    } catch (err) {
      console.error(`Failed to get asset price for ${asset.type} asset with id=${asset.id}: ${err}`)
      return
    }

    assets.push({
      ...asset,
      balance,
      decimals,
      usd
    })
  }))

  return assets
}
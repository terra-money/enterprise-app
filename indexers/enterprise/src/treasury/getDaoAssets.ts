import { Asset, AssetWithInfoAndBalance, areSameAsset } from "chain/Asset";
import { getAssetBalance } from "chain/getAssetBalance";
import { contractQuery } from "chain/lcd";
import { DaoEntity } from "indexers/daos/types";
import { enterprise, enterprise_factory } from "types/contracts";
import { withoutDuplicates } from "utils/withoutDuplicates";
import { withoutUndefined } from "utils/withoutUndefined";
import { getDaoTotalStakedAmount } from "./getDaoTotalStakedAmount";
import Big from "big.js";
import { getAssetInfo } from "chain/getAssetInfo";
import { assertEnvVar } from "@apps-shared/indexers/utils/assertEnvVar";
import { NetworkName } from "chain/NetworkName";

const toAsset = (
  response: enterprise.AssetInfoBaseFor_Addr | enterprise_factory.AssetInfoBaseFor_Addr
): Asset | undefined => {
  if ('native' in response) {
    return {
      type: 'native',
      id: response.native,
    };
  } else if ('cw20' in response) {
    return {
      type: 'cw20',
      id: response.cw20,
    };
  }

  return undefined;
};

export const getDaoAssets = async ({ address, enterpriseFactoryContract, membershipContractAddress }: Pick<DaoEntity, 'address' | 'enterpriseFactoryContract' | 'membershipContractAddress'>) => {
  const { assets: globalWhitelist } = await contractQuery<enterprise_factory.AssetWhitelistResponse>(enterpriseFactoryContract, { global_asset_whitelist: {}, });
  const { assets: assetsWhitelist } = await contractQuery<enterprise.AssetWhitelistResponse>(address, { asset_whitelist: {}, });

  const whitelist: Asset[] = withoutDuplicates(withoutUndefined([...globalWhitelist, ...assetsWhitelist].map(toAsset)), areSameAsset);

  const result: AssetWithInfoAndBalance[] = [];
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

    try {
      const info = await getAssetInfo({
        asset,
        networkName: assertEnvVar('NETWORK') as NetworkName
      })
      result.push({
        ...asset,
        balance,
        ...info
      })
    } catch (err) {
      console.error(`Failed to get asset info for ${asset.type} asset with id=${asset.id}: ${err}`)
      return
    }
  }))

  return result
}
import { enterprise } from 'types/contracts';
import { hasAsset } from './areSameAssets';

export const toUpdateAssetWhitelistMsg = (
  initialAssets: enterprise.AssetInfoBaseFor_Addr[],
  newAssets: enterprise.AssetInfoBaseFor_Addr[]
): enterprise.UpdateAssetWhitelistMsg => {
  return {
    add: newAssets.filter((asset) => !hasAsset(initialAssets, asset)),
    remove: initialAssets.filter((asset) => !hasAsset(newAssets, asset)),
  };
};

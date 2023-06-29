import { enterprise } from 'types/contracts';
import { Asset, areSameAsset } from 'chain/Asset';
import { fromAsset } from 'dao/utils/whitelist';

export const toUpdateAssetWhitelistMsg = (
  initialAssets: Asset[],
  newAssets: Asset[]
): enterprise.UpdateAssetWhitelistMsg => {
  return {
    add: newAssets.filter((asset) => initialAssets.every((a) => !areSameAsset(a, asset))).map(fromAsset),
    remove: initialAssets.filter((asset) => newAssets.every((a) => !areSameAsset(a, asset))).map(fromAsset),
  };
};

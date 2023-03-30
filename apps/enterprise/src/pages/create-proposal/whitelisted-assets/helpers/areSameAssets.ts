import { AssetType } from 'chain';
import { enterprise } from 'types/contracts';

export const getAssetType = (asset: enterprise.AssetInfoBaseFor_Addr) => Object.keys(asset)[0] as AssetType;

export const getAssetKey = (asset: enterprise.AssetInfoBaseFor_Addr) => Object.values(asset)[0] as string;

export const areSameAssets = (one: enterprise.AssetInfoBaseFor_Addr, another: enterprise.AssetInfoBaseFor_Addr) => {
  return getAssetKey(one) === getAssetKey(another);
};

export const hasAsset = (assets: enterprise.AssetInfoBaseFor_Addr[], asset: enterprise.AssetInfoBaseFor_Addr) =>
  assets.some((a) => areSameAssets(asset, a));

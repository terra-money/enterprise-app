import { fromChainAmount } from './utils/fromChainAmount';

type AssetType = 'cw20' | 'native';

export interface Asset {
  type: AssetType;
  id: string;
}

export interface AssetWithPrice extends Asset {
  balance: string;
  decimals: number;
  usd: number;
}

export interface AssetInfo {
  name: string;
  symbol?: string;
  decimals: number;
  icon?: string;
}

export type AssetInfoWithPrice = AssetInfo & AssetWithPrice;

export const areSameAsset = (a: Asset, b: Asset) => {
  return a.type === b.type && a.id === b.id;
};

export const getAssetBalanceInUsd = (asset: AssetWithPrice) =>
  fromChainAmount(asset.balance, asset.decimals) * asset.usd;

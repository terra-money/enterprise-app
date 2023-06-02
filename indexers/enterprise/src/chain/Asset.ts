type AssetType = 'cw20' | 'native'

export interface Asset {
  type: AssetType
  id: string
}

export interface AssetInfo {
  name: string
  symbol?: string
  decimals: number
  icon?: string
}

export type AssetWithInfoAndBalance = Asset & AssetInfo & { balance: string }

export const areSameAsset = (a: Asset, b: Asset) => {
  return a.type === b.type && a.id === b.id
}
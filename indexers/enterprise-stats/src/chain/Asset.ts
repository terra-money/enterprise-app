type AssetType = 'cw20' | 'native'

export interface Asset {
  type: AssetType
  id: string
}

export interface AssetWithPrice extends Asset {
  balance: string
  decimals: number
  usd: number
}
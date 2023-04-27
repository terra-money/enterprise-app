type AssetType = 'cw20' | 'native'

export interface Asset {
  type: AssetType
  id: string
}

export interface AssetWithBalance extends Asset {
  balance: string
  decimals: number
}
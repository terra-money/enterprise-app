import { Asset, AssetInfo } from "./Asset";
import { getAssetsInfo } from "./getAssetsInfo";
import { getWhitelistedIBCTokens } from "./getWhitelistedIBCTokens";
import { contractQuery } from "./lcd";
import memoize from 'memoizee'

interface CW20TokenInfoResponse {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
}

export const getAssetInfo = memoize(async ({ id, type }: Asset): Promise<AssetInfo> => {
  if (type === 'cw20') {
    const {
      name,
      symbol,
      decimals,
    } = await contractQuery<CW20TokenInfoResponse>(id, {
      token_info: {},
    });

    return {
      name,
      symbol,
      decimals,
    }
  }

  if (id === 'uluna') {
    return {
      name: 'LUNA',
      symbol: 'LUNA',
      decimals: 6,
    }
  }

  const tfmAssets = await getAssetsInfo()
  const tfmAsset = tfmAssets.find(asset => asset.contract_addr === id)
  if (tfmAsset) {
    return {
      name: tfmAsset.name,
      symbol: tfmAsset.symbol,
      decimals: tfmAsset.decimals,
    }
  }

  const ibcTokens = await getWhitelistedIBCTokens()
  const ibcToken = ibcTokens[id]
  if (!ibcToken) {
    throw new Error(`IBC asset ${id} not found`)
  }

  return {
    name: ibcToken.name,
    symbol: ibcToken.symbol,
    decimals: ibcToken.decimals,
  }
})
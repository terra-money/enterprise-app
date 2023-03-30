import { fetchIBCTokens } from "@terra-money/apps/queries"
import { useLCDClient, useWallet } from "@terra-money/wallet-provider"
import { AssetType } from "chain"
import { QUERY_KEY } from "queries"
import { useQuery } from "react-query"

interface AssetInfoQueryParams {
  id: string
  type: AssetType
}

interface CW20TokenInfoResponse {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
}


interface AssetInfo {
  name: string
  symbol: string
  decimals: number
  icon?: string
}

export const useAssetInfoQuery = ({ id, type }: AssetInfoQueryParams) => {
  const lcdClient = useLCDClient()
  const { network } = useWallet();

  return useQuery<AssetInfo>([QUERY_KEY.ASSET_INFO, id, type], async () => {
    if (type === 'cw20') {
      const {
        name,
        symbol,
        decimals,
      } = await lcdClient.wasm.contractQuery<CW20TokenInfoResponse>(id, {
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
        icon: "https://assets.terra.money/icon/svg/LUNA.png",
      }
    }

    const ibcTokens = await fetchIBCTokens(network.name)
    const ibcToken = ibcTokens[id]
    if (!ibcToken) {
      throw new Error(`IBC asset ${id} not found`)
    }

    return {
      name: ibcToken.name,
      symbol: ibcToken.symbol,
      decimals: ibcToken.decimals,
      icon: ibcToken.icon,
    }
  })
}
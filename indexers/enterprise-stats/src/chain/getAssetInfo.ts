import { Asset } from "./Asset";
import { getWhitelistedIBCTokens } from "./getWhitelistedIBCTokens";
import { getLCDClient } from "./lcd";

interface CW20TokenInfoResponse {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
}

export const getAssetInfo = async ({ id, type }: Asset) => {
  const lcd = getLCDClient()
  if (type === 'cw20') {
    const {
      name,
      symbol,
      decimals,
    } = await lcd.wasm.contractQuery<CW20TokenInfoResponse>(id, {
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

  const ibcTokens = await getWhitelistedIBCTokens()
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
}
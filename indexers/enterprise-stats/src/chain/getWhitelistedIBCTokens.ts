import { assertEnvVar } from "shared/assertEnvVar";
import memoize from 'memoizee'
import axios from "axios";

export type TokenBase = {
  key: string;
  name: string;
  symbol: string;
  icon: string;
  decimals: number;
  coinGeckoId?: string;
};

export type IBCToken = TokenBase & {
  type: "ibc";
  path: string;
  base_denom: string;
  denom: string;
};

export interface IBCTokensResponse {
  [tokenAddr: string]: IBCToken;
}

interface IBCTokensNetworkResponse {
  [network: string]: IBCTokensResponse;
}

export type CW20Token = TokenBase & {
  type: "cw20";
  protocol: string;
  token: string;
};

export interface CW20TokensResponse {
  [tokenAddr: string]: CW20Token;
}

const fixTokenResponse = <
  T extends IBCTokensResponse
>(
  type: "cw20" | "ibc",
  tokens: T,
  accessor: (key: string) => string = (k) => k
) => {
  return Object.keys(tokens).reduce((prev, current) => {
    const key = accessor(current);
    return {
      ...prev,
      [key]: {
        ...tokens[current],
        type,
        key,
        // decimals are optional in the responses but its much easier for us not to worry
        // about optionality within the app so we can standardize the default here
        decimals:
          tokens[current].decimals === undefined ||
            tokens[current].decimals === 0
            ? 6
            : tokens[current].decimals,
      },
    };
  }, {});
};

export const getWhitelistedIBCTokens = memoize(async () => {
  const { data: tokens } = await axios.get<IBCTokensNetworkResponse>('https://assets.terra.money/ibc/tokens.json');

  const network = assertEnvVar('NETWORK')

  return tokens && tokens[network] ? fixTokenResponse('ibc', tokens[network], (key) => `ibc/${key}`) : {};
})
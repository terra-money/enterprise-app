import { CW20Addr } from '@terra-money/apps/types';

export type TokenBase = {
  key: string;
  name: string;
  symbol: string;
  icon: string;
  decimals: number;
  coinGeckoId?: string;
};

export type NativeToken = TokenBase & {
  type: 'native';
  denom: string;
};

export const LUNA: NativeToken = {
  key: 'uluna',
  type: 'native',
  denom: 'uluna',
  name: 'LUNA',
  symbol: 'LUNA',
  decimals: 6,
  icon: 'https://assets.terra.money/icon/svg/Luna.svg',
  coinGeckoId: 'terra-luna-2',
};

export interface NativeTokensResponse {
  [tokenAddr: string]: NativeToken;
}

export type CW20Token = TokenBase & {
  type: 'cw20';
  protocol: string;
  token: CW20Addr;
};

export interface CW20TokensResponse {
  [tokenAddr: string]: CW20Token;
}

export type IBCToken = TokenBase & {
  type: 'ibc';
  path: string;
  base_denom: string;
  denom: string;
};

export interface IBCTokensResponse {
  [tokenAddr: string]: IBCToken;
}

export type Token = NativeToken | CW20Token | IBCToken;

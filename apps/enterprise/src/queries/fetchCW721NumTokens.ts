import Big from 'big.js';
import { LCDClient } from '@terra-money/feather.js';

interface CW721NumTokensResponse {
  count: string;
}

export const fetchCW721NumTokens = async (lcd: LCDClient, nftAddress: string): Promise<Big> => {
  const response = await lcd.wasm.contractQuery<CW721NumTokensResponse>(nftAddress, {
    num_tokens: {},
  });

  return Big(response?.count ?? 0) as Big;
};

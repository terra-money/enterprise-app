import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { NetworkInfo } from '@terra-money/wallet-provider';
import { getNetworkOrLCD } from '@terra-money/apps/queries';

interface CW721NumTokensResponse {
  count: string;
}

export const fetchCW721NumTokens = async (network: NetworkInfo, nftAddress: string): Promise<Big> => {
  const lcd = getNetworkOrLCD(network);

  const response = await lcd.wasm.contractQuery<CW721NumTokensResponse>(nftAddress, {
    num_tokens: {},
  });

  return Big(response?.count ?? 0) as u<Big>;
};

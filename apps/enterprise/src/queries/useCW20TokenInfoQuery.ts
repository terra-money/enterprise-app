import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { NetworkInfo, useWallet } from '@terra-money/wallet-provider';
import { LCDClient } from '@terra-money/feather.js';

export interface CW20TokenInfoResponse {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
}

export const fetchCW20TokenInfo = async (
  networkOrLCD: NetworkInfo | LCDClient,
  tokenAddr: string
): Promise<CW20TokenInfoResponse> => {
  const lcd =
    networkOrLCD instanceof LCDClient
      ? networkOrLCD
      : new LCDClient({
        URL: networkOrLCD.lcd,
        chainID: networkOrLCD.chainID,
      });

  const response = await lcd.wasm.contractQuery<CW20TokenInfoResponse>(tokenAddr, {
    token_info: {},
  });

  return response;
};

export const useCW20TokenInfoQuery = (
  tokenAddress: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<CW20TokenInfoResponse> => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.CW20_TOKEN_QUERY, tokenAddress],
    () => {
      return fetchCW20TokenInfo(network, tokenAddress);
    },
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

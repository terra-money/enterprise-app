import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { useLcdClient } from '@terra-money/wallet-kit';
import { LCDClient } from '@terra-money/feather.js';

export interface CW20TokenInfoResponse {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
}

export const fetchCW20TokenInfo = async (lcd: LCDClient, tokenAddr: string): Promise<CW20TokenInfoResponse> => {
  const response = await lcd.wasm.contractQuery<CW20TokenInfoResponse>(tokenAddr, {
    token_info: {},
  });

  return response;
};

export const useCW20TokenInfoQuery = (
  tokenAddress: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<CW20TokenInfoResponse> => {
  const lcd = useLcdClient();

  return useQuery(
    [QUERY_KEY.CW20_TOKEN_QUERY, tokenAddress],
    () => {
      return fetchCW20TokenInfo(lcd, tokenAddress);
    },
    {
      enabled: !!tokenAddress,
      refetchOnMount: false,
      ...options,
    }
  );
};

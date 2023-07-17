import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import Big from 'big.js';
import { QUERY_KEY } from 'queries';
import { fetchCW721NumTokens } from './fetchCW721NumTokens';
import { useLCDClient } from '@terra-money/wallet-provider';

export const useCW721NumTokensQuery = (
  nftAddress: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<Big> => {
  const lcd = useLCDClient();

  return useQuery([QUERY_KEY.CW721_NUM_TOKENS, nftAddress], () => fetchCW721NumTokens(lcd, nftAddress), {
    refetchOnMount: false,
    ...options,
  });
};

import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import Big from 'big.js';
import { QUERY_KEY } from 'queries';
import { fetchCW721NumTokens } from './fetchCW721NumTokens';
import { useLcdClient } from '@terra-money/wallet-kit';

export const useCW721NumTokensQuery = (
  nftAddress: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<Big> => {
  const lcd = useLcdClient();

  return useQuery([QUERY_KEY.CW721_NUM_TOKENS, nftAddress], () => fetchCW721NumTokens(lcd, nftAddress), {
    refetchOnMount: false,
    ...options,
  });
};

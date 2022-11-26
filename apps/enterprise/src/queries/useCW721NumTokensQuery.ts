import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { QUERY_KEY } from 'queries';
import { useWallet } from '@terra-money/wallet-provider';
import { fetchCW721NumTokens } from './fetchCW721NumTokens';

export const useCW721NumTokensQuery = (
  nftAddress: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<u<Big>> => {
  const { network } = useWallet();

  return useQuery([QUERY_KEY.CW721_NUM_TOKENS, nftAddress], () => fetchCW721NumTokens(network, nftAddress), {
    refetchOnMount: false,
    ...options,
  });
};

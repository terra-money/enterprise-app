import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { useLcdClient } from '@terra-money/wallet-kit';
import { fetchCW3ListVoters } from './fetchCW3ListVoters';

export const useCW3ListVotersQuery = (
  address: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<Awaited<ReturnType<typeof fetchCW3ListVoters>>> => {
  const lcd = useLcdClient();

  return useQuery([QUERY_KEY.CW3_LIST_VOTERS, address], () => fetchCW3ListVoters(lcd, address), {
    refetchOnMount: false,
    ...options,
  });
};

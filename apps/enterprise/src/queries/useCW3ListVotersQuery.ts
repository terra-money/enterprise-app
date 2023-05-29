import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { useLCDClient } from '@terra-money/wallet-provider';
import { fetchCW3ListVoters } from './fetchCW3ListVoters';

export const useCW3ListVotersQuery = (
  address: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<Awaited<ReturnType<typeof fetchCW3ListVoters>>> => {
  const lcd = useLCDClient();

  return useQuery([QUERY_KEY.CW3_LIST_VOTERS, address], () => fetchCW3ListVoters(lcd, address), {
    refetchOnMount: false,
    ...options,
  });
};

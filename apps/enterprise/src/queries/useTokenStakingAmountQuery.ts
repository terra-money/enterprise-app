import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { useLCDClient } from '@terra-money/wallet-provider';
import Big from 'big.js';
import { CW20Addr, u } from '@terra-money/apps/types';
import { fetchStakingAmount } from './fetchStakingAmount';

export const useTokenStakingAmountQuery = (
  daoAddress: string,
  walletAddress?: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<u<Big>> => {
  const lcd = useLCDClient();

  return useQuery(
    [QUERY_KEY.TOKEN_STAKING_AMOUNT, daoAddress, walletAddress],
    () => fetchStakingAmount(lcd, daoAddress as CW20Addr, walletAddress as CW20Addr),
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

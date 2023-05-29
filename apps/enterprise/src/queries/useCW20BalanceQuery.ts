import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { QUERY_KEY } from 'queries';
import { fetchCW20Balance } from '@terra-money/apps/queries';
import { useLCDClient } from '@terra-money/wallet-provider';

export const useCW20BalanceQuery = (
  walletAddr: string,
  tokenAddress: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<u<Big>> => {
  const lcd = useLCDClient();

  return useQuery(
    [QUERY_KEY.CW20_TOKEN_BALANCE, tokenAddress, walletAddr],
    () => {
      return fetchCW20Balance(lcd, walletAddr, tokenAddress);
    },
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

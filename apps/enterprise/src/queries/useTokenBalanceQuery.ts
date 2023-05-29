import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { QUERY_KEY } from 'queries';
import { Token } from 'types';
import { useLCDClient } from '@terra-money/wallet-provider';
import { fetchTokenBalance } from '@terra-money/apps/queries';

export const useTokenBalanceQuery = (
  walletAddr: string,
  token: Token,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<u<Big>> => {
  const lcd = useLCDClient();

  return useQuery(
    [QUERY_KEY.TOKEN_BALANCE, token.key, walletAddr],
    () => {
      return fetchTokenBalance(lcd, token, walletAddr);
    },
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

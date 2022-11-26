import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { QUERY_KEY } from 'queries';
import { Token } from 'types';
import { useWallet } from '@terra-money/wallet-provider';
import { fetchTokenBalance } from '@terra-money/apps/queries';

export const useTokenBalanceQuery = (
  walletAddr: string,
  token: Token,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<u<Big>> => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.TOKEN_BALANCE, network, token.key, walletAddr],
    () => {
      return fetchTokenBalance(network, token, walletAddr);
    },
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

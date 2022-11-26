import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { QUERY_KEY } from 'queries';
import { useWallet } from '@terra-money/wallet-provider';
import { fetchCW20Balance } from '@terra-money/apps/queries';

export const useCW20BalanceQuery = (
  walletAddr: string,
  tokenAddress: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<u<Big>> => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.CW20_TOKEN_BALANCE, tokenAddress, walletAddr],
    () => {
      return fetchCW20Balance(network, walletAddr, tokenAddress);
    },
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

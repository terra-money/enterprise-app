import { fetchNativeBalance } from '@terra-money/apps/queries';
import { u } from '@terra-money/apps/types';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import Big from 'big.js';
import { useQuery, UseQueryResult } from 'react-query';
import { QUERY_KEY } from './queryKey';

export const useNativeBalanceQuery = (): UseQueryResult<u<Big> | undefined> => {
  const connectedWallet = useConnectedWallet();

  return useQuery(
    [QUERY_KEY.NATIVE_BALANCE],
    () => fetchNativeBalance(connectedWallet!.network, connectedWallet!.walletAddress, 'uluna'),
    {
      refetchOnMount: false,
      enabled: connectedWallet !== undefined,
    }
  );
};

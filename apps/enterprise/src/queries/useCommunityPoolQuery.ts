import { u } from '@terra-money/apps/types';
import { useLCDClient } from '@terra-money/wallet-provider';
import Big from 'big.js';
import { useQuery, UseQueryResult } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { useChainID, useNetworkName } from '@terra-money/apps/hooks';

export const useCommunityPoolQuery = (): UseQueryResult<u<Big> | undefined> => {
  const lcd = useLCDClient();
  const ntworkName = useNetworkName();
  const chainID = useChainID();

  return useQuery(
    [QUERY_KEY.COMMUNITY_POOL, ntworkName],
    async () => {
      const coins = await lcd.distribution.communityPool(chainID);

      const uLuna = coins.get('uluna');

      return Big(uLuna !== undefined ? uLuna.amount.toString() : '0') as u<Big>;
    },
    {
      refetchOnMount: false,
    }
  );
};

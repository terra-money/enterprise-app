import { useLcdClient } from '@terra-money/wallet-kit';
import Big from 'big.js';
import { useQuery, UseQueryResult } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { useNetworkName } from 'chain/hooks/useNetworkName';
import { useChainID } from 'chain/hooks/useChainID';

export const useCommunityPoolQuery = (): UseQueryResult<Big | undefined> => {
  const lcd = useLcdClient();
  const ntworkName = useNetworkName();
  const chainID = useChainID();

  return useQuery(
    [QUERY_KEY.COMMUNITY_POOL, ntworkName],
    async () => {
      const coins = await lcd.distribution.communityPool(chainID);

      const uLuna = coins.get('uluna');

      return Big(uLuna !== undefined ? uLuna.amount.toString() : '0') as Big;
    },
    {
      refetchOnMount: false,
    }
  );
};

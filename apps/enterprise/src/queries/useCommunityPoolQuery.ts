import { getNetworkOrLCD } from '@terra-money/apps/queries';
import { u } from '@terra-money/apps/types';
import { useWallet } from '@terra-money/wallet-provider';
import Big from 'big.js';
import { useQuery, UseQueryResult } from 'react-query';
import { QUERY_KEY } from './queryKey';

export const useCommunityPoolQuery = (): UseQueryResult<u<Big> | undefined> => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.COMMUNITY_POOL, network.name],
    async () => {
      const lcd = getNetworkOrLCD(network);

      const coins = await lcd.distribution.communityPool();

      const uLuna = coins.get('uluna');

      return Big(uLuna !== undefined ? uLuna.amount.toString() : '0') as u<Big>;
    },
    {
      refetchOnMount: false,
    }
  );
};

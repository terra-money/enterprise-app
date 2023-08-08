import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import Big from 'big.js';

import { fetchStakingAmount } from './fetchStakingAmount';
import { useLcdClient } from '@terra-money/wallet-kit';

export const useNFTStakingAmountQuery = (
  daoAddress: string,
  walletAddress?: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<Big> => {
  const lcd = useLcdClient();

  return useQuery(
    [QUERY_KEY.NFT_STAKING_AMOUNT, daoAddress, walletAddress],
    () => fetchStakingAmount(lcd, daoAddress, walletAddress),
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

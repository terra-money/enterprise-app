import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import Big from 'big.js';

import { fetchStakingAmount } from './fetchStakingAmount';
import { useLCDClient } from '@terra-money/wallet-provider';

export const useNFTStakingAmountQuery = (
  daoAddress: string,
  walletAddress?: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<Big> => {
  const lcd = useLCDClient();

  return useQuery(
    [QUERY_KEY.NFT_STAKING_AMOUNT, daoAddress, walletAddress],
    () => fetchStakingAmount(lcd, daoAddress, walletAddress),
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

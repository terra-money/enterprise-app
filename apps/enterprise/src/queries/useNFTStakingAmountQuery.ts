import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { useWallet } from '@terra-money/wallet-provider';
import Big from 'big.js';
import { CW20Addr, u } from '@terra-money/apps/types';
import { fetchStakingAmount } from './fetchStakingAmount';

export const useNFTStakingAmountQuery = (
  daoAddress: string,
  walletAddress?: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<u<Big>> => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.NFT_STAKING_AMOUNT, daoAddress, walletAddress],
    () => fetchStakingAmount(network, daoAddress as CW20Addr, walletAddress as CW20Addr),
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

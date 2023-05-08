import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { NetworkInfo, useWallet } from '@terra-money/wallet-provider';
import { CW20Addr } from '@terra-money/apps/types';
import { enterprise } from 'types/contracts';
import { contractQuery } from '@terra-money/apps/queries';
import { LCDClient } from '@terra-money/feather.js';

export const fetchNFTStaking = async (
  networkOrLCD: NetworkInfo | LCDClient,
  daoAddress: CW20Addr,
  walletAddress: CW20Addr
): Promise<enterprise.NftUserStake | undefined> => {
  const response = await contractQuery<enterprise.QueryMsg, enterprise.UserStakeResponse>(networkOrLCD, daoAddress, {
    user_stake: { user: walletAddress },
  });

  return typeof response.user_stake === 'object' && 'nft' in response.user_stake ? response.user_stake.nft : undefined;
};

export const useNFTStakingQuery = (
  daoAddress: string,
  walletAddress?: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<enterprise.NftUserStake | undefined> => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.NFT_STAKING, daoAddress, walletAddress],
    () => fetchNFTStaking(network, daoAddress as CW20Addr, walletAddress as CW20Addr),
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

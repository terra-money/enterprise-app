import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';

import { enterprise } from 'types/contracts';
import { LCDClient } from '@terra-money/feather.js';
import { useLcdClient } from '@terra-money/wallet-kit';
import { assertDefined } from 'lib/shared/utils/assertDefined';

export const fetchNFTStaking = async (
  lcd: LCDClient,
  daoAddress: string,
  walletAddress: string
): Promise<enterprise.NftUserStake | undefined> => {
  const response = await lcd.wasm.contractQuery<enterprise.UserStakeResponse>(daoAddress, {
    user_stake: { user: walletAddress },
  });

  return typeof response.user_stake === 'object' && 'nft' in response.user_stake ? response.user_stake.nft : undefined;
};

export const useNFTStakingQuery = (
  daoAddress: string,
  walletAddress?: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<enterprise.NftUserStake | undefined> => {
  const lcd = useLcdClient();

  return useQuery(
    [QUERY_KEY.NFT_STAKING, daoAddress, walletAddress],
    () => fetchNFTStaking(lcd, daoAddress, assertDefined(walletAddress)),
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

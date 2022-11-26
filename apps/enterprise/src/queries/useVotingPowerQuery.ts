import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { NetworkInfo, useWallet } from '@terra-money/wallet-provider';
import { LCDClient } from '@terra-money/terra.js';
import Big from 'big.js';
import { contractQuery } from '@terra-money/apps/queries';
import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';

export const fetchVotingPower = async (
  networkOrLCD: NetworkInfo | LCDClient,
  daoAddress: CW20Addr,
  walletAddress: CW20Addr
): Promise<Big> => {
  const response = await contractQuery<enterprise.QueryMsg, enterprise.MemberInfoResponse>(networkOrLCD, daoAddress, {
    member_info: { member_address: walletAddress },
  });
  return Big(response.voting_power);
};

export const useVotingPowerQuery = (
  daoAddress?: string,
  walletAddress?: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<Big | undefined> => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.VOTING_POWER, daoAddress, walletAddress],
    () => fetchVotingPower(network, daoAddress as CW20Addr, walletAddress as CW20Addr),
    {
      ...options,
      refetchOnMount: false,
      enabled: options.enabled && Boolean(daoAddress && walletAddress),
    }
  );
};

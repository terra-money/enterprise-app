import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { NetworkInfo, useWallet } from '@terra-money/wallet-provider';
import { LCDClient } from '@terra-money/feather.js';
import { contractQuery } from '@terra-money/apps/queries';
import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';

export const fetchReleasableClaims = async (
  networkOrLCD: NetworkInfo | LCDClient,
  daoAddress: CW20Addr,
  walletAddress: CW20Addr
): Promise<enterprise.Claim[]> => {
  const response = await contractQuery<enterprise.QueryMsg, enterprise.ClaimsResponse>(networkOrLCD, daoAddress, {
    releasable_claims: { owner: walletAddress },
  });
  return response.claims;
};

export const useReleasableClaimsQuery = (
  daoAddress: string,
  walletAddress: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<enterprise.Claim[]> => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.RELEASABLE_CLAIMS, daoAddress, walletAddress],
    () => {
      return fetchReleasableClaims(network, daoAddress as CW20Addr, walletAddress as CW20Addr);
    },
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

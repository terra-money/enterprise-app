import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { LCDClient } from '@terra-money/feather.js';
import { enterprise } from 'types/contracts';

import { useLCDClient } from '@terra-money/wallet-provider';

export const fetchReleasableClaims = async (
  lcd: LCDClient,
  daoAddress: string,
  walletAddress: string
): Promise<enterprise.Claim[]> => {
  const response = await lcd.wasm.contractQuery<enterprise.ClaimsResponse>(daoAddress, {
    releasable_claims: { owner: walletAddress },
  });
  return response.claims;
};

export const useReleasableClaimsQuery = (
  daoAddress: string,
  walletAddress: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<enterprise.Claim[]> => {
  const lcd = useLCDClient();

  return useQuery(
    [QUERY_KEY.RELEASABLE_CLAIMS, daoAddress, walletAddress],
    () => {
      return fetchReleasableClaims(lcd, daoAddress, walletAddress);
    },
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

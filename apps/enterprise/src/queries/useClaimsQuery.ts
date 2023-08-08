import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { LCDClient } from '@terra-money/feather.js';
import { enterprise } from 'types/contracts';

import { useLcdClient } from '@terra-money/wallet-kit';

export const fetchClaims = async (
  lcd: LCDClient,
  daoAddress: string,
  walletAddress: string
): Promise<enterprise.Claim[]> => {
  const response = await lcd.wasm.contractQuery<enterprise.ClaimsResponse>(daoAddress, {
    claims: { owner: walletAddress },
  });
  return response.claims;
};

export const useClaimsQuery = (
  daoAddress: string,
  walletAddress: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<enterprise.Claim[]> => {
  const lcd = useLcdClient();

  return useQuery(
    [QUERY_KEY.CLAIMS, daoAddress, walletAddress],
    () => {
      return fetchClaims(lcd, daoAddress, walletAddress);
    },
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

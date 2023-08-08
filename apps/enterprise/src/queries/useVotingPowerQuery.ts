import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { LCDClient } from '@terra-money/feather.js';
import Big from 'big.js';
import { enterprise } from 'types/contracts';

import { useLcdClient } from '@terra-money/wallet-kit';
import { assertDefined } from 'lib/shared/utils/assertDefined';

export const fetchVotingPower = async (lcd: LCDClient, daoAddress: string, walletAddress: string): Promise<Big> => {
  const response = await lcd.wasm.contractQuery<enterprise.MemberInfoResponse>(daoAddress, {
    member_info: { member_address: walletAddress },
  });
  return Big(response.voting_power);
};

export const useVotingPowerQuery = (
  daoAddress: string,
  walletAddress?: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<Big | undefined> => {
  const lcd = useLcdClient();

  return useQuery(
    [QUERY_KEY.VOTING_POWER, daoAddress, walletAddress],
    () => fetchVotingPower(lcd, daoAddress, assertDefined(walletAddress)),
    {
      ...options,
      refetchOnMount: false,
      enabled: options.enabled && Boolean(daoAddress && walletAddress),
    }
  );
};

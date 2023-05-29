import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { LCDClient } from '@terra-money/feather.js';
import Big from 'big.js';
import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';
import { useLCDClient } from '@terra-money/wallet-provider';

export const fetchVotingPower = async (lcd: LCDClient, daoAddress: CW20Addr, walletAddress: CW20Addr): Promise<Big> => {
  const response = await lcd.wasm.contractQuery<enterprise.MemberInfoResponse>(daoAddress, {
    member_info: { member_address: walletAddress },
  });
  return Big(response.voting_power);
};

export const useVotingPowerQuery = (
  daoAddress?: string,
  walletAddress?: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<Big | undefined> => {
  const lcd = useLCDClient();

  return useQuery(
    [QUERY_KEY.VOTING_POWER, daoAddress, walletAddress],
    () => fetchVotingPower(lcd, daoAddress as CW20Addr, walletAddress as CW20Addr),
    {
      ...options,
      refetchOnMount: false,
      enabled: options.enabled && Boolean(daoAddress && walletAddress),
    }
  );
};

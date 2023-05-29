import { fetchNativeBalance } from '@terra-money/apps/queries';
import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { useQuery, UseQueryResult } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { useLCDClient } from '@terra-money/wallet-provider';
import { assertDefined } from '@terra-money/apps/utils';

export const useNativeBalanceQuery = (): UseQueryResult<u<Big> | undefined> => {
  const myAddress = useMyAddress();
  const lcd = useLCDClient();

  return useQuery([QUERY_KEY.NATIVE_BALANCE], () => fetchNativeBalance(lcd, assertDefined(myAddress), 'uluna'), {
    refetchOnMount: false,
    enabled: myAddress !== undefined,
  });
};

import { fetchNativeBalance } from '@terra-money/apps/queries';

import Big from 'big.js';
import { useQuery, UseQueryResult } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { useLCDClient } from '@terra-money/wallet-provider';
import { assertDefined } from 'lib/shared/utils/assertDefined';

export const useNativeBalanceQuery = (): UseQueryResult<Big | undefined> => {
  const myAddress = useMyAddress();
  const lcd = useLCDClient();

  return useQuery([QUERY_KEY.NATIVE_BALANCE], () => fetchNativeBalance(lcd, assertDefined(myAddress), 'uluna'), {
    refetchOnMount: false,
    enabled: myAddress !== undefined,
  });
};

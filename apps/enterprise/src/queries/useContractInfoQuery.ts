import { useLCDClient } from '@terra-money/wallet-provider';
import { useQuery } from 'react-query';
import { QUERY_KEY } from './queryKey';

export const useContractInfoQuery = (address: string) => {
  const lcd = useLCDClient();

  return useQuery([QUERY_KEY.CONTRACT_INFO, address], async () => {
    return lcd.wasm.contractInfo(address);
  });
};

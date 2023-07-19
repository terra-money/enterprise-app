import { useLcdClient } from '@terra-money/wallet-kit';
import { useQuery } from 'react-query';
import { QUERY_KEY } from './queryKey';

export const useContractInfoQuery = (address: string) => {
  const lcd = useLcdClient();

  return useQuery([QUERY_KEY.CONTRACT_INFO, address], async () => {
    return lcd.wasm.contractInfo(address);
  });
};

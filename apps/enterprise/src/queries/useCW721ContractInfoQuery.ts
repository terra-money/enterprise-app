import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { useWallet } from '@terra-money/wallet-provider';
import { fetchCW721ContractInfo } from './fetchCW721ContractInfo';

export const useCW721ContractInfoQuery = (
  nftAddress: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<Awaited<ReturnType<typeof fetchCW721ContractInfo>>> => {
  const { network } = useWallet();

  return useQuery([QUERY_KEY.CW721_CONTRACT_INFO, nftAddress], () => fetchCW721ContractInfo(network, nftAddress), {
    refetchOnMount: false,
    ...options,
  });
};

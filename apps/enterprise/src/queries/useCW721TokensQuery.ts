import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { useWallet } from '@terra-money/wallet-provider';
import { fetchCW721Tokens } from './fetchCW721Tokens';

export const useCW721TokensQuery = (
  walletAddress: string,
  nftAddress: string,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
): UseQueryResult<Awaited<ReturnType<typeof fetchCW721Tokens>>> => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.CW721_TOKENS, walletAddress, nftAddress],
    () => fetchCW721Tokens(network, walletAddress, nftAddress),
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

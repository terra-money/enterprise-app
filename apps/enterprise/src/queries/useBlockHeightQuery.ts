import { useQuery, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { NetworkInfo, useWallet } from '@terra-money/wallet-provider';

export const fetchBlockHeight = async (network: NetworkInfo): Promise<number> => {
  const response = await fetch(`${network.lcd}/blocks/latest`);

  const json = await response.json();

  return +json.block.header.height;
};

export const useBlockHeightQuery = (): UseQueryResult<number> => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.BLOCK_HEIGHT, network.lcd],
    () => {
      return fetchBlockHeight(network);
    },
    {
      refetchOnMount: true,
      refetchInterval: 60000,
    }
  );
};

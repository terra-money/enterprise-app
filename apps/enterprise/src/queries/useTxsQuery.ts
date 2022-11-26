import { useQuery, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { NetworkInfo, useWallet } from '@terra-money/wallet-provider';
import { CW20Addr, TxResponse } from '@terra-money/apps/types';

export const fetchTxs = async (
  network: NetworkInfo,
  address: CW20Addr,
  offset: number,
  limit: number
): Promise<any> => {
  const response = await fetch(`${network.api}/txs?offset=${offset}&limit=${limit}&account=${address}`);

  const json = await response.json();

  return json.txs as TxResponse[];
};

export const useTxsQuery = (
  address: CW20Addr,
  offset: number = 0,
  limit: number = 10
): UseQueryResult<TxResponse[]> => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.TXS, network.lcd],
    () => {
      return fetchTxs(network, address, offset, limit);
    },
    {
      refetchOnMount: true,
    }
  );
};

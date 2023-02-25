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

  //todo: include sent transactions and completed messages
  const url = `${network.lcd}/cosmos/tx/v1beta1/txs?events=transfer.recipient%3D%27${address}%27&pagination.reverse=true&pagination.limit=${limit}`

  const response = await fetch(url);

  const json = await response.json();

  return json.tx_responses as TxResponse[];
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

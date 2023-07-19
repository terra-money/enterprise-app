import { useQuery, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { useLcdClient } from '@terra-money/wallet-kit';
import { getRecord } from 'lib/shared/utils/getRecord';
import { useChainID } from 'chain/hooks/useChainID';
import { TxResponse } from 'chain/transactions';

const transactionsInOnePage = 100;

interface LCDEventDescription {
  name: string;
  property: string;
}

const listenForEvents: LCDEventDescription[] = [
  { name: 'message', property: 'sender' },
  { name: 'transfer', property: 'recipient' },
  { name: 'transfer', property: 'sender' },
  { name: 'wasm', property: 'to' },
];

interface QueryTransactionsParams {
  address: string;
  lcdBaseUrl: string;
  eventDescription: LCDEventDescription;
}

const queryTransactions = async ({
  address,
  lcdBaseUrl,
  eventDescription: { name, property },
}: QueryTransactionsParams) => {
  const url = `${lcdBaseUrl}/cosmos/tx/v1beta1/txs?events=${name}.${property}='${address}'&pagination.reverse=true&pagination.limit=${transactionsInOnePage}`;

  const response = await fetch(url);

  const json = await response.json();

  return json.tx_responses as TxResponse[];
};

export const useTxsQuery = (address: string): UseQueryResult<TxResponse[]> => {
  const lcd = useLcdClient();
  const chainID = useChainID();
  const lcdBaseUrl = lcd.config[chainID].lcd;

  return useQuery(
    [QUERY_KEY.TXS, address],
    async () => {
      const queries: QueryTransactionsParams[] = listenForEvents.map((eventDescription) => ({
        address,
        lcdBaseUrl,
        eventDescription,
      }));

      const transactions = (await Promise.all(queries.map(queryTransactions))).flatMap((txs) => txs);

      const txRecords = getRecord(transactions, (t) => t.txhash);
      const unqueTransactions = Object.values(txRecords);
      const sortedTransactions = unqueTransactions.sort((a, b) => Number(b.height) - Number(a.height));

      return sortedTransactions;
    },
    {
      refetchOnMount: true,
    }
  );
};

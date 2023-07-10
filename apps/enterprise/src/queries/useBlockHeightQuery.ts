import { useQuery, UseQueryResult } from 'react-query';
import { QUERY_KEY } from 'queries';
import { useLCDClient } from '@terra-money/wallet-provider';
import { useChainID } from 'chain/hooks/useChainID';

export const fetchBlockHeight = async (lcdBaseUrl: string): Promise<number> => {
  const response = await fetch(`${lcdBaseUrl}/blocks/latest`);

  const json = await response.json();

  return +json.block.header.height;
};

export const useBlockHeightQuery = (): UseQueryResult<number> => {
  const lcd = useLCDClient();
  const chainID = useChainID();

  const lcdBaseUrl = lcd.config[chainID].lcd;

  return useQuery(
    QUERY_KEY.BLOCK_HEIGHT,
    () => {
      return fetchBlockHeight(lcdBaseUrl);
    },
    {
      refetchOnMount: true,
      refetchInterval: 60000,
    }
  );
};

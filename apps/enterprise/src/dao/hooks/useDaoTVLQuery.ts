import { useApiEndpoint } from 'hooks';
import { DaoResponse, QUERY_KEY } from 'queries';
import { useQuery } from 'react-query';

export const useDaoTVLQuery = (address: string) => {
  const endpoint = useApiEndpoint({
    path: 'v1/daos/{address}',
    route: { address },
  });

  return useQuery(
    [QUERY_KEY.DAOS, address],
    async () => {
      const response = await fetch(endpoint);

      const { tvl }: DaoResponse = await response.json();

      return tvl;
    },
    {
      refetchOnMount: false,
    }
  );
};

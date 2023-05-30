import { useApiEndpoint } from 'hooks';
import { QUERY_KEY, fetchDAOsQuery } from 'queries';
import { useQuery } from 'react-query';

export const useAllDaosQuery = () => {
  const endpoint = useApiEndpoint({
    path: 'v1/daos',
    params: {},
  });

  return useQuery(
    QUERY_KEY.DAOS,
    () => {
      return fetchDAOsQuery(endpoint);
    },
    {
      refetchOnMount: false,
    }
  );
};

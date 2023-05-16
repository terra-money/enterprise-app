import { useApiEndpoint } from "hooks"
import { QUERY_KEY, fetchDAOsQuery } from "queries";
import { useQuery } from "react-query";
import { useAreIndexersEnabled } from "state/hooks/useAreIndexersEnabled";

export const useAllDaosQuery = () => {
  const endpoint = useApiEndpoint({
    path: "v1/daos",
    params: {}
  });

  const [areIndexersEnabled] = useAreIndexersEnabled()

  return useQuery(QUERY_KEY.DAOS, () => {
    if (!areIndexersEnabled) {
      throw new Error('DAOs query is disabled. Enable indexers to use this query.')
    }

    return fetchDAOsQuery(endpoint);
  }, {
    refetchOnMount: false,
  });
}
import { useQuery, UseQueryResult } from 'react-query';
import { enterprise } from 'types/contracts';
import { DAO, DAOGovernanceConfig, DAOSocials } from 'types';
import { QUERY_KEY } from './queryKey';
import { Direction, useApiEndpoint } from 'hooks';
import { useAreIndexersEnabled } from 'state/hooks/useAreIndexersEnabled';

interface DAOsQueryOptions {
  query?: string;
  limit?: number;
  direction?: Direction;
  queryKey?: string;
}

export type DAOsQueryResponse = Array<{
  address: string;
  type: enterprise.DaoType;
  name: string;
  description: string | undefined;
  logo: string | undefined;
  membershipContractAddress: string;
  enterpriseFactoryContract: string;
  fundsDistributorContract: string,
  socials: DAOSocials;
  config: DAOGovernanceConfig;
  council: enterprise.DaoCouncil;
}>;

export const fetchDAOsQuery = async (endpoint: string) => {
  const response = await fetch(endpoint);

  const json: DAOsQueryResponse = await response.json();

  return json.map((entity) => {
    return new DAO(
      entity.address,
      entity.type,
      entity.name,
      entity.description,
      entity.logo,
      entity.membershipContractAddress,
      entity.enterpriseFactoryContract,
      entity.fundsDistributorContract,
      entity.socials,
      entity.config,
      entity.council
    );
  });
};

export const useDAOsQuery = (options: DAOsQueryOptions = {}): UseQueryResult<Array<DAO> | undefined> => {
  const { query, limit = 100, direction = query?.length === 0 ? 'desc' : 'asc', queryKey = QUERY_KEY.DAOS } = options;

  const [areIndexersEnabled] = useAreIndexersEnabled()

  const endpoint = useApiEndpoint({
    path: 'v1/daos',
    params: {
      query,
      limit,
      direction,
    },
  });

  return useQuery([queryKey, endpoint], () => {
    if (!areIndexersEnabled) {
      throw new Error('DAOs query is disabled. Enable indexers to use this query.')
    }

    return fetchDAOsQuery(endpoint);
  }, {
    refetchOnMount: false,
  });
};

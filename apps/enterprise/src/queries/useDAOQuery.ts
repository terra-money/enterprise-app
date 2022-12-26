import { CW20Addr } from '@terra-money/apps/types';
import { useQuery, UseQueryResult } from 'react-query';
import { DAO } from 'types';
import { QUERY_KEY } from './queryKey';
import { useApiEndpoint } from 'hooks';
import { DAOsQueryResponse } from './useDAOsQuery';

export const useDAOQuery = (address: CW20Addr): UseQueryResult<DAO | undefined> => {
  const endpoint = useApiEndpoint({
    path: 'v1/daos/{address}',
    route: {
      address,
    },
  });

  return useQuery(
    [QUERY_KEY.DAO, endpoint],
    async () => {
      const response = await fetch(endpoint);

      if (response.status !== 404) {
        const entity: DAOsQueryResponse[0] = await response.json();

        return new DAO(
          entity.address,
          entity.type,
          entity.name,
          entity.description,
          entity.logo,
          entity.membershipContractAddress,
          entity.enterpriseFactoryContract,
          entity.socials,
          entity.config,
          entity.council
        );
      }

      return undefined;
    },
    {
      refetchOnMount: false,
    }
  );
};

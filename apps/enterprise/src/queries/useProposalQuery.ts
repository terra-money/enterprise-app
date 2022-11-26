import { CW20Addr } from '@terra-money/apps/types';
import Big from 'big.js';
import { useApiEndpoint } from 'hooks';
import { ProposalsQueryResponse, useDAOQuery } from 'queries';
import { useQuery, UseQueryResult } from 'react-query';
import { Proposal } from 'types';
import { QUERY_KEY } from './queryKey';

interface UseProposalQueryOptions {
  daoAddress: CW20Addr;
  id: number;
  enabled?: boolean;
}

export const useProposalQuery = (options: UseProposalQueryOptions): UseQueryResult<Proposal | undefined> => {
  const { id, daoAddress, enabled = true } = options;

  const endpoint = useApiEndpoint({
    path: 'v1/daos/{address}/proposals/{id}',
    route: {
      address: daoAddress,
      id,
    },
  });

  const { data: dao, isLoading } = useDAOQuery(daoAddress);

  return useQuery(
    [QUERY_KEY.PROPOSAL, endpoint],
    async () => {
      const response = await fetch(endpoint);

      if (response.status !== 404 && dao) {
        const entity: ProposalsQueryResponse[0] = await response.json();

        return new Proposal(
          dao,
          entity.id,
          entity.title,
          entity.description,
          entity.created,
          entity.expires,
          entity.proposalActions,
          entity.status,
          Big(entity.yesVotes),
          Big(entity.noVotes),
          Big(entity.abstainVotes),
          Big(entity.vetoVotes ?? '0'),
          Big(entity.totalVotes ?? '0')
        );
      }

      return undefined;
    },
    {
      refetchOnMount: false,
      enabled: enabled && isLoading === false,
    }
  );
};

import { CW20Addr } from '@terra-money/apps/types';
import { assertDefined } from '@terra-money/apps/utils';
import Big from 'big.js';
import { Direction, useApiEndpoint } from 'hooks';
import { ProposalsQueryResponse, useDAOQuery } from 'queries';
import { useQuery, UseQueryResult } from 'react-query';
import { Proposal } from 'types';
import { QUERY_KEY } from './queryKey';

interface UseProposalsQueryOptions {
  address: string;
  direction?: Direction;
  enabled?: boolean;
}

export const useDaoProposalsQuery = ({
  address,
  enabled = true,
  direction = 'desc',
}: UseProposalsQueryOptions): UseQueryResult<Array<Proposal> | undefined> => {
  const endpoint = useApiEndpoint({
    path: 'v1/daos/{address}/proposals',
    route: {
      address,
    },
    params: {
      limit: 100,
      direction,
    },
  });

  // TODO: the Proposal classes need the DAO but this means that the DAO's need to be fetched too
  // or that the proposal returns the DAO in the API. For now this should work, but need a better
  // long term solution
  const { data: dao } = useDAOQuery(address as CW20Addr);

  return useQuery(
    [QUERY_KEY.PROPOSALS, address],
    async () => {
      const response = await fetch(endpoint);

      const proposals: Proposal[] = [];

      if (response.status !== 404) {
        const json: ProposalsQueryResponse = await response.json();
        console.log(json);

        json.forEach((entity) => {
          proposals.push(
            new Proposal(
              assertDefined(dao),
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
            )
          );
        });
      }

      return proposals;
    },
    {
      refetchOnMount: false,
      enabled: !!(enabled && dao),
    }
  );
};

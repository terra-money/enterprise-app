import { compareAddress } from '@terra-money/apps/utils';
import Big from 'big.js';
import { Proposal } from 'dao/shared/proposal';
import { ApiEndpoints, Direction, useApiEndpoint } from 'hooks';
import { useDAOsQuery } from 'queries';
import { useQuery, UseQueryResult } from 'react-query';
import { enterprise } from 'types/contracts';
import { QUERY_KEY } from './queryKey';

interface UseProposalsQueryOptions {
  daoAddress?: string;
  limit?: number;
  direction?: Direction;
  enabled?: boolean;
  queryKey?: QUERY_KEY;
}

export type ProposalsQueryResponse = Array<{
  daoAddress: string;
  id: number;
  created: number;
  title: string;
  description: string;
  expires: enterprise.Expiration;
  status: enterprise.ProposalStatus;
  proposalActions: enterprise.ProposalAction[];
  yesVotes: string;
  noVotes: string;
  abstainVotes: string;
  vetoVotes: string;
  totalVotes: string;
}>;

export const useProposalsQuery = (
  options: UseProposalsQueryOptions = {}
): UseQueryResult<Array<Proposal> | undefined> => {
  const { daoAddress, limit = 12, enabled = true, direction = 'desc', queryKey = QUERY_KEY.PROPOSALS } = options;

  const template: ApiEndpoints =
    daoAddress === undefined
      ? {
          path: 'v1/proposals',
          params: {
            limit,
            direction,
          },
        }
      : {
          path: 'v1/daos/{address}/proposals',
          route: {
            address: daoAddress,
          },
          params: {
            limit,
            direction,
          },
        };

  const endpoint = useApiEndpoint(template);

  // TODO: the Proposal classes need the DAO but this means that the DAO's need to be fetched too
  // or that the proposal returns the DAO in the API. For now this should work, but need a better
  // long term solution
  const { data: daos = [] } = useDAOsQuery({ limit: 100000 });

  return useQuery(
    [queryKey, endpoint],
    async () => {
      const response = await fetch(endpoint);

      const proposals: Proposal[] = [];

      if (response.status !== 404) {
        const json: ProposalsQueryResponse = await response.json();

        json.forEach((entity) => {
          const dao = daos.find((d) => compareAddress(d.address, entity.daoAddress));

          if (dao === undefined) {
            reportError('Could not find the correct DAO for the proposal');
          } else {
            proposals.push({
              ...entity,
              dao,
              actions: entity.proposalActions,
              yesVotes: Big(entity.yesVotes),
              noVotes: Big(entity.noVotes),
              abstainVotes: Big(entity.abstainVotes),
              vetoVotes: Big(entity.vetoVotes ?? '0'),
              totalVotes: Big(entity.totalVotes ?? '0'),
              votingType: 'regular',
            });
          }
        });
      }

      return proposals;
    },
    {
      refetchOnMount: false,
      enabled: enabled && daos.length > 0,
    }
  );
};

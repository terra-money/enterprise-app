import { CW20Addr } from '@terra-money/apps/types';
import { assertDefined } from '@terra-money/apps/utils';
import { useContract } from 'chain/hooks/useContract';
import { toProposal } from 'dao/utils/toProposal';
import { Direction } from 'hooks';
import { useDAOQuery } from 'queries';
import { useQuery, UseQueryResult } from 'react-query';
import { Proposal } from 'dao/shared/proposal';
import { enterprise } from 'types/contracts';
import { QUERY_KEY } from './queryKey';

interface UseProposalsQueryOptions {
  address: string;
  direction?: Direction;
  enabled?: boolean;
}

type ProposalsQueryArguments = Extract<enterprise.QueryMsg, { proposals: {} }>;
// type CouncilProposalsQueryArguments = Extract<enterprise.QueryMsg, { council_proposals: {} }>;

export const useDaoProposalsQuery = ({
  address,
  enabled = true,
}: UseProposalsQueryOptions): UseQueryResult<Array<Proposal> | undefined> => {
  const { query } = useContract();
  const { data: dao } = useDAOQuery(address as CW20Addr);

  return useQuery(
    [QUERY_KEY.PROPOSALS, address],
    async () => {
      const result: Proposal[] = [];
      try {
        const { proposals } = await query<ProposalsQueryArguments, enterprise.ProposalsResponse>(address, {
          proposals: {},
        });
        result.push(...proposals.map((resp) => toProposal(resp, assertDefined(dao), 'regular')));
      } catch (err) {
        reportError(err);
      }
      // TODO: Add back when new version of contracts is added
      // try {
      //   const { proposals } = await query<CouncilProposalsQueryArguments, enterprise.ProposalsResponse>(address, {
      //     council_proposals: {},
      //   });
      //   result.push(...proposals.map((resp) => toProposal(resp, assertDefined(dao), 'council')));
      // } catch (err) {
      //   console.log('Council', err);
      //   reportError(err);
      // }

      return result.sort((a, b) => b.created - a.created);
    },
    {
      refetchOnMount: false,
      enabled: !!(enabled && dao),
    }
  );
};

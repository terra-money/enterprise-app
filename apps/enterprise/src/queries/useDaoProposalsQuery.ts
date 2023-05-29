import { CW20Addr } from '@terra-money/apps/types';
import { assertDefined } from '@terra-money/apps/utils';
import { useContract } from 'chain/hooks/useContract';
import { toProposal } from 'dao/utils/toProposal';
import { useDAOQuery } from 'queries';
import { useQuery, UseQueryResult } from 'react-query';
import { Proposal } from 'dao/shared/proposal';
import { enterprise } from 'types/contracts';
import { QUERY_KEY } from './queryKey';
import { toDao } from 'dao/utils/toDao';

interface UseProposalsQueryOptions {
  address: string;
  enabled?: boolean;
}

type ProposalsQueryArguments = Extract<enterprise.QueryMsg, { proposals: {} }>;

export const useDaoProposalsQuery = ({
  address,
  enabled = true,
}: UseProposalsQueryOptions): UseQueryResult<Array<Proposal> | undefined> => {
  const { query } = useContract();
  const { data: dao } = useDAOQuery(address as CW20Addr);

  return useQuery(
    [QUERY_KEY.PROPOSALS, address],
    async () => {
      const { proposals } = await query<ProposalsQueryArguments, enterprise.ProposalsResponse>(address, {
        proposals: { limit: 100 },
      });

      return proposals.map((resp) => toProposal(resp, toDao(assertDefined(dao)))).sort((a, b) => b.created - a.created);
    },
    {
      refetchOnMount: false,
      enabled: !!(enabled && dao),
    }
  );
};

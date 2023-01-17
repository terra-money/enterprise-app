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

export const useDaoProposalsQuery = ({
  address,
  enabled = true,
}: UseProposalsQueryOptions): UseQueryResult<Array<Proposal> | undefined> => {
  const { query } = useContract();
  const { data: dao } = useDAOQuery(address as CW20Addr);

  return useQuery(
    [QUERY_KEY.PROPOSALS, address],
    async () => {
      const result = await query<ProposalsQueryArguments, enterprise.ProposalsResponse>(address, { proposals: {} });
      const proposals = result.proposals.map((resp) => toProposal(resp, assertDefined(dao)));

      return proposals.sort((a, b) => b.created - a.created);
    },
    {
      refetchOnMount: false,
      enabled: !!(enabled && dao),
    }
  );
};

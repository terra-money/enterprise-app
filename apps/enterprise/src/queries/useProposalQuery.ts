import { CW20Addr } from '@terra-money/apps/types';
import { assertDefined } from '@terra-money/apps/utils';
import { useContract } from 'chain/hooks/useContract';
import { toProposal } from 'dao/utils/toProposal';
import { useDAOQuery } from 'queries';
import { useQuery, UseQueryResult } from 'react-query';
import { Proposal } from 'dao/shared/proposal';
import { enterprise } from 'types/contracts';
import { QUERY_KEY } from './queryKey';

interface UseProposalQueryOptions {
  daoAddress: CW20Addr;
  id: number;
  enabled?: boolean;
}

type ProposalsQueryArguments = Extract<enterprise.QueryMsg, { proposal: {} }>;
type CouncilProposalsQueryArguments = Extract<enterprise.QueryMsg, { council_proposal: {} }>;

export const useProposalQuery = (options: UseProposalQueryOptions): UseQueryResult<Proposal | undefined> => {
  const { query } = useContract();

  const { id, daoAddress, enabled = true } = options;

  const { data: dao } = useDAOQuery(daoAddress as CW20Addr);

  return useQuery(
    [QUERY_KEY.PROPOSAL, daoAddress, id],
    async () => {
      try {
        let resp = await query<ProposalsQueryArguments, enterprise.ProposalResponse>(daoAddress, {
          proposal: { proposal_id: id },
        });
        return toProposal(resp, assertDefined(dao), 'regular');
      } catch (err) {
        const councilProposal = await query<CouncilProposalsQueryArguments, enterprise.ProposalResponse>(daoAddress, {
          council_proposal: { proposal_id: id },
        });
        return toProposal(councilProposal, assertDefined(dao), 'council');
      }
    },
    {
      refetchOnMount: false,
      enabled: !!(enabled && dao),
    }
  );
};

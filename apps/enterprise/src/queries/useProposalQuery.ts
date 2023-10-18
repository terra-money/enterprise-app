import { assertDefined } from 'lib/shared/utils/assertDefined';
import { useDAOQuery } from 'queries';
import { useQuery, UseQueryResult } from 'react-query';
import { Proposal } from 'dao/shared/proposal';
import { QUERY_KEY } from './queryKey';
import { toDao } from 'dao/utils/toDao';
import { useContract } from 'chain/hooks/useContract';
import { enterprise } from 'types/contracts';
import { toProposal } from 'dao/utils/toProposal';

interface UseProposalQueryOptions {
  daoAddress: string;
  id: number;
  enabled?: boolean;
}

type DaoProposalArguments = Extract<enterprise.QueryMsg, { proposal: {} }>;

export const useProposalQuery = (options: UseProposalQueryOptions): UseQueryResult<Proposal | undefined> => {
  const { id, daoAddress, enabled = true } = options;
  const { query } = useContract();

  const { data: daoResponse } = useDAOQuery(daoAddress);

  return useQuery(
    [QUERY_KEY.PROPOSAL, daoAddress, id],
    async () => {
      let response = await query<DaoProposalArguments, enterprise.ProposalResponse>(daoAddress, {
        proposal: {
          proposal_id: id,
        },
      });
      const dao = toDao(assertDefined(daoResponse));
      return toProposal(response, dao);
    },
    {
      refetchOnMount: false,
      enabled: !!(enabled && daoResponse),
    }
  );
};

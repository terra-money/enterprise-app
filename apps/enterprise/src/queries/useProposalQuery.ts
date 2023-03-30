import { CW20Addr } from '@terra-money/apps/types';
import { assertDefined } from '@terra-money/apps/utils';
import { useContract } from 'chain/hooks/useContract';
import { toProposal } from 'dao/utils/toProposal';
import { useDAOQuery } from 'queries';
import { useQuery, UseQueryResult } from 'react-query';
import { Proposal } from 'dao/shared/proposal';
import { enterprise } from 'types/contracts';
import { QUERY_KEY } from './queryKey';
import { useApiEndpoint } from 'hooks';
import { apiResponseToProposal, ProposalApiResponse } from 'proposal/ProposalApiResponse';

interface UseProposalQueryOptions {
  daoAddress: CW20Addr;
  id: number;
  enabled?: boolean;
}

type ProposalsQueryArguments = Extract<enterprise.QueryMsg, { proposal: {} }>;

export const useProposalQuery = (options: UseProposalQueryOptions): UseQueryResult<Proposal | undefined> => {
  const { query } = useContract();

  const { id, daoAddress, enabled = true } = options;

  const { data: dao } = useDAOQuery(daoAddress as CW20Addr);

  const apiEndpoint = useApiEndpoint({
    path: 'v1/daos/{address}/proposals/{id}',
    route: { address: daoAddress, id }
  })

  return useQuery(
    [QUERY_KEY.PROPOSAL, daoAddress, id],
    async () => {
      try {
        const response = await fetch(apiEndpoint);
        const json: ProposalApiResponse = await response.json();
        return apiResponseToProposal(json, assertDefined(dao))
      } catch {
        let resp = await query<ProposalsQueryArguments, enterprise.ProposalResponse>(daoAddress, {
          proposal: { proposal_id: id },
        });
        return toProposal(resp, assertDefined(dao));
      }
    },
    {
      refetchOnMount: false,
      enabled: !!(enabled && dao),
    }
  );
};

import { CW20Addr } from '@terra-money/apps/types';
import { assertDefined } from '@terra-money/apps/utils';
import { useDAOQuery } from 'queries';
import { useQuery, UseQueryResult } from 'react-query';
import { Proposal } from 'dao/shared/proposal';
import { QUERY_KEY } from './queryKey';
import { useApiEndpoint } from 'hooks';
import { apiResponseToProposal, ProposalApiResponse } from 'proposal/ProposalApiResponse';
import { toDao } from 'dao/utils/toDao';

interface UseProposalQueryOptions {
  daoAddress: CW20Addr;
  id: number;
  enabled?: boolean;
}

export const useProposalQuery = (options: UseProposalQueryOptions): UseQueryResult<Proposal | undefined> => {
  const { id, daoAddress, enabled = true } = options;

  const { data: daoResponse } = useDAOQuery(daoAddress as CW20Addr);

  const apiEndpoint = useApiEndpoint({
    path: 'v1/daos/{address}/proposals/{id}',
    route: { address: daoAddress, id },
  });

  return useQuery(
    [QUERY_KEY.PROPOSAL, daoAddress, id],
    async () => {
      const dao = toDao(assertDefined(daoResponse));
      const response = await fetch(apiEndpoint);
      const json: ProposalApiResponse = await response.json();
      return apiResponseToProposal(json, dao);
    },
    {
      refetchOnMount: false,
      enabled: !!(enabled && daoResponse),
    }
  );
};

import { assertDefined } from 'lib/shared/utils/assertDefined';
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
  const { data: dao } = useDAOQuery(address);

  return useQuery(
    [QUERY_KEY.PROPOSALS, address],
    async () => {
      // Removing temporarily to allow for querying all proposals
      // const { proposals } = await query<ProposalsQueryArguments, enterprise.ProposalsResponse>(address, {
      //   proposals: { limit: 500 },
      // });

      // return proposals.map((resp) => toProposal(resp, toDao(assertDefined(dao)))).sort((a, b) => b.created - a.created);

      let proposalList: any[] = [];
      let startAfter = 0;

      while (true) {
        const { proposals } = await query<ProposalsQueryArguments, enterprise.ProposalsResponse>(address, {
          proposals: { 
            limit: 100,
            start_after: startAfter
          },
        });
        await proposalList.push.apply(proposalList, proposals);
        startAfter += 100;
        
        if(proposals.length < 100) {
          return proposalList.map((resp) => toProposal(resp, toDao(assertDefined(dao)))).sort((a, b) => b.created - a.created);
        }
      }
    },
    {
      refetchOnMount: false,
      enabled: !!(enabled && dao),
    }
  );
};

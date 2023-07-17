import { useInfiniteQuery } from 'react-query';
import { Vote } from 'types';
import { enterprise } from 'types/contracts';
import { QUERY_KEY } from './queryKey';
import { useContract } from 'chain/hooks/useContract';
import { getLast } from 'lib/shared/utils/getlast';

interface UseProposalVotesQueryOptions {
  contract: string;
  proposalId: number;
  limit?: number;
}

export const useProposalVotesQuery = (options: UseProposalVotesQueryOptions) => {
  const { contract, proposalId, limit = 50 } = options;
  const { query } = useContract();

  return useInfiniteQuery(
    [QUERY_KEY.PROPOSAL_VOTES, contract, proposalId],
    async ({ pageParam }) => {
      if (pageParam === null) {
        return;
      }

      const { votes } = await query<enterprise.QueryMsg, enterprise.PollVotersResponse>(contract, {
        proposal_votes: {
          proposal_id: proposalId,
          start_after: pageParam,
          limit,
        },
      });

      return {
        votes: votes.filter((p) => p.poll_id === proposalId).map((vote) => new Vote(vote)),
      };
    },
    {
      refetchOnMount: false,
      getNextPageParam: (lastPage) => {
        if (lastPage === undefined || lastPage.votes?.length < limit) {
          return null;
        }

        const lastVote = getLast(lastPage.votes);
        return lastVote.voter || null;
      },
    }
  );
};

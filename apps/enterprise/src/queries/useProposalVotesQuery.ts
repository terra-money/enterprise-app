import { contractQuery } from '@terra-money/apps/queries';
import { CW20Addr } from '@terra-money/apps/types';
import { getLast } from '@terra-money/apps/utils';
import { useWallet } from '@terra-money/wallet-provider';
import { useInfiniteQuery } from 'react-query';
import { Vote } from 'types';
import { enterprise } from 'types/contracts';
import { QUERY_KEY } from './queryKey';

interface UseProposalVotesQueryOptions {
  contract: CW20Addr;
  proposalId: number;
  limit?: number;
}

export const useProposalVotesQuery = (options: UseProposalVotesQueryOptions) => {
  const { contract, proposalId, limit = 10 } = options;
  const { network } = useWallet();

  return useInfiniteQuery(
    [QUERY_KEY.PROPOSAL_VOTES, contract, proposalId],
    async ({ pageParam }) => {
      if (pageParam === null) {
        return;
      }

      const { votes } = await contractQuery<enterprise.QueryMsg, enterprise.PollVotersResponse>(network, contract, {
        proposal_votes: {
          proposal_id: proposalId,
          start_after: pageParam,
          // TODO: remove when the contract is updated
          proposal_type: 'general',
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

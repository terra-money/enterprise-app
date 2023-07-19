import { useQuery, UseQueryOptions } from 'react-query';
import { enterprise } from 'types/contracts';
import { QUERY_KEY } from './queryKey';
import { useLcdClient } from '@terra-money/wallet-kit';

export const useProposalVoteQuery = (
  contract: string,
  member: string,
  proposalId: number,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
) => {
  const lcd = useLcdClient();

  return useQuery(
    [QUERY_KEY.PROPOSAL_VOTE, contract, proposalId, member],
    async () => {
      const response = await lcd.wasm.contractQuery<enterprise.PollVoterResponse>(contract, {
        member_vote: {
          member,
          proposal_id: proposalId,
        },
      });
      return response.vote;
    },
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

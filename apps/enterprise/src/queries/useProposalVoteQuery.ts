import { contractQuery } from '@terra-money/apps/queries';
import { CW20Addr } from '@terra-money/apps/types';
import { useWallet } from '@terra-money/wallet-provider';
import { useQuery, UseQueryOptions } from 'react-query';
import { enterprise } from 'types/contracts';
import { QUERY_KEY } from './queryKey';

export const useProposalVoteQuery = (
  contract: string,
  member: string,
  proposalId: number,
  options: Partial<Pick<UseQueryOptions, 'enabled'>> = { enabled: true }
) => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.PROPOSAL_VOTE, contract, proposalId, member],
    async () => {
      const response = await contractQuery<enterprise.QueryMsg, enterprise.PollVoterResponse>(
        network,
        contract as CW20Addr,
        {
          member_vote: {
            member,
            proposal_id: proposalId,
          },
        }
      );
      return response.vote;
    },
    {
      refetchOnMount: false,
      ...options,
    }
  );
};

import Big from 'big.js';
import { DAO } from 'types';
import { enterprise } from 'types/contracts';
import { Proposal } from 'dao/shared/proposal';

export const toProposal = (
  { proposal, results, total_votes_available }: enterprise.ProposalResponse,
  dao: DAO
): Proposal => {
  const [yesVotes, noVotes, abstainVotes, vetoVotes] = results.reduce(
    (previous, [t, v]) => {
      previous[t] = v;
      return previous;
    },
    ['0', '0', '0', '0']
  );
  const created = 'started_at' in proposal ? Math.trunc(Big(proposal.started_at).div(1000000).toNumber()) : 0;

  return {
    dao,
    ...proposal,
    actions: proposal.proposal_actions,
    created,
    yesVotes: Big(yesVotes),
    noVotes: Big(noVotes),
    abstainVotes: Big(abstainVotes),
    vetoVotes: Big(vetoVotes),
    totalVotes: Big(total_votes_available),
    type: proposal.proposal_type,
    proposer: proposal.proposer,
  };
};

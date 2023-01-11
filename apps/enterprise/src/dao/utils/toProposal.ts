import Big from 'big.js';
import { DAO, Proposal } from 'types';
import { enterprise } from 'types/contracts';

export const toProposal = ({ proposal, results, total_votes_available }: enterprise.ProposalResponse, dao: DAO) => {
  const [yesVotes, noVotes, abstainVotes, vetoVotes] = results.reduce(
    (previous, [t, v]) => {
      previous[t] = v;
      return previous;
    },
    ['0', '0', '0', '0']
  );
  const created = 'started_at' in proposal ? Math.trunc(Big(proposal.started_at).div(1000000).toNumber()) : 0;

  return new Proposal(
    dao,
    proposal.id,
    proposal.title,
    proposal.description,
    created,
    proposal.expires,
    proposal.proposal_actions,
    proposal.status,
    Big(yesVotes),
    Big(noVotes),
    Big(abstainVotes),
    Big(vetoVotes),
    Big(total_votes_available)
  );
};

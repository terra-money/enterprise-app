import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { enterprise } from './contracts';

type EnterpriseVoteOptions = readonly (enterprise.DefaultVoteOption | { multichoice: number })[];

const voteOptions: EnterpriseVoteOptions = ['yes', 'no', 'abstain', 'veto', { multichoice: 0 }];

export class Vote {
  public readonly proposalId: number;
  public readonly voter: string;
  public readonly outcome: enterprise.VoteOutcome;
  public readonly amount: u<Big>;
  constructor(public readonly vote: enterprise.Vote) {
    this.proposalId = vote.poll_id;
    this.voter = vote.voter;
    this.outcome = mapVoteOutcome(vote.outcome, voteOptions);
    this.amount = Big(vote.amount) as u<Big>;
  }
}

export const mapVoteOutcome = (voteOutcome: enterprise.VoteOutcome | number, voteOptions: EnterpriseVoteOptions): enterprise.VoteOutcome => {
  if (typeof voteOutcome === 'number') {
    return voteOptions[voteOutcome] as enterprise.VoteOutcome;
  } else if (typeof voteOutcome === 'object' && 'default' in voteOutcome) {
    return { default: voteOutcome.default };
  } else if (typeof voteOutcome === 'object' && 'multichoice' in voteOutcome) {
    return { multichoice: voteOutcome.multichoice };
  } else {
    throw new Error(`Invalid vote outcome: ${voteOutcome}`);
  }
}

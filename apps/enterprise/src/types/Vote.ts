import Big from 'big.js';
import { enterprise } from './contracts';

const voteOptions: readonly enterprise.VoteOutcome[] = ['yes', 'no', 'abstain', 'veto'] as const;

export class Vote {
  public readonly proposalId: number;
  public readonly voter: string;
  public readonly outcome: enterprise.VoteOutcome;
  public readonly amount: Big;
  constructor(public readonly vote: enterprise.Vote) {
    this.proposalId = vote.poll_id;
    this.voter = vote.voter;
    this.outcome = voteOptions[vote.outcome];
    this.amount = Big(vote.amount);
  }
}

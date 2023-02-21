import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { enterprise } from './contracts';


const voteOptions: enterprise.DefaultVoteOption[] = ['yes', 'no', 'abstain', 'veto'];

export class Vote {
  public readonly proposalId: number;
  public readonly voter: string;
  public readonly outcome: enterprise.DefaultVoteOption;
  public readonly amount: u<Big>;
  constructor(public readonly vote: enterprise.Vote) {
    this.proposalId = vote.poll_id;
    this.voter = vote.voter;
    this.outcome = voteOptions[vote.outcome];
    this.amount = Big(vote.amount) as u<Big>;
  }
}

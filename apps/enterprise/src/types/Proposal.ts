import Big from 'big.js';
import { enterprise } from './contracts';
import { DAO } from './DAO';

export type ProposalStatusName = 'Active' | 'Pending' | 'Passed' | 'Rejected' | 'Executed';

export class Proposal {
  constructor(
    public readonly dao: DAO,
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly created: number,
    public readonly expires: enterprise.Expiration,
    public readonly proposal_actions: enterprise.ProposalAction[],
    public readonly status: enterprise.ProposalStatus,
    public readonly yesVotes: Big,
    public readonly noVotes: Big,
    public readonly abstainVotes: Big,
    public readonly vetoVotes: Big,
    public readonly totalVotes: Big
  ) {}

  hasExpired = (blockHeight: number, timestamp: number): boolean => {
    if ('at_time' in this.expires) {
      return Number(this.expires.at_time) / 1000000 < timestamp;
    }
    if ('at_height' in this.expires) {
      return Number(this.expires.at_height) < blockHeight;
    }
    return true;
  };

  getEstimatedExpiry = (blockHeight: number): Date | undefined => {
    if ('at_time' in this.expires) {
      return new Date(Number(this.expires.at_time) / 1000000);
    }

    // TODO: need to estimate the expiry time here
    return undefined;
    // if ('at_height' in this.expires) {
    //   return Number(this.expires.at_height) < blockHeight;
    // }
    // return true;
  };

  getCurrentStatus = (blockHeight: number): ProposalStatusName => {
    // if the proposal is in progess but it has expired then it means it
    // hasnt been executed yet so we treat this as an inferred pending state
    if (this.status === 'in_progress' && this.hasExpired(blockHeight, Date.now())) {
      return 'Pending';
    }

    return this.status === 'in_progress'
      ? 'Active'
      : this.status === 'passed'
      ? 'Passed'
      : this.status === 'rejected'
      ? 'Rejected'
      : 'Executed';
  };
}

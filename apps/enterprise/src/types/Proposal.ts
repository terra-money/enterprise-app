import Big from 'big.js';
import { enterprise } from './contracts';
import { DAO } from './DAO';

export type ProposalStatusName = 'Active' | 'Pending' | 'Passed' | 'Rejected' | 'Executed';

export type ProposalType =
  | 'Text'
  | 'Config'
  | 'Upgrade'
  | 'Other'
  | 'Assets'
  | 'NFTs'
  | 'Execute'
  | 'Members'
  | 'Council';

export class Proposal {
  public readonly type: ProposalType;

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
  ) {
    this.type = Proposal.calculateType(proposal_actions);
  }

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

  private static calculateType = (actions: enterprise.ProposalAction[]): ProposalType => {
    // TOOD: work out what type this should be based on the actions
    if (actions.length === 0) {
      return 'Text';
    }

    for (const action of actions) {
      if ('upgrade_dao' in action) {
        return 'Upgrade';
      }

      if ('update_gov_config' in action || 'update_metadata' in action) {
        return 'Config';
      }

      if ('update_asset_whitelist' in action) {
        return 'Assets';
      }

      if ('update_nft_whitelist' in action) {
        return 'NFTs';
      }

      if ('execute_msgs' in action) {
        return 'Execute';
      }

      if ('modify_multisig_membership' in action) {
        return 'Members';
      }

      if ('update_council' in action) {
        return 'Council';
      }
    }

    return 'Other';
  };
}

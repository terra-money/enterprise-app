import Big from 'big.js';
import { DAO } from 'types';
import { enterprise } from 'types/contracts';

export const proposalTypes = ['general', 'council'] as const;

export interface Proposal {
  dao: DAO;
  id: number;
  title: string;
  description: string;
  created: number;
  expires: enterprise.Expiration;
  actions: enterprise.ProposalAction[];
  status: enterprise.ProposalStatus;
  yesVotes: Big;
  noVotes: Big;
  abstainVotes: Big;
  vetoVotes: Big;
  totalVotes: Big;
  type: enterprise.ProposalType;
  executionTxHash?: string;
  proposer?: string;
}

export const sharedProposalTypes = [
  'text',
  'metadata',
  'config',
  'upgrade',
  'assets',
  'nfts',
  'execute',
  'spend',
  'delegate',
  'undelegate',
  'redelegate',
  'council',
  'minWeightForRewards',
] as const;

export const daoProposalsRecord = {
  multisig: [...sharedProposalTypes, 'members'] as const,
  token: [...sharedProposalTypes, 'mint', 'burn'] as const,
  nft: [...sharedProposalTypes, 'mintNft'] as const,
} as const;

export type ProposalType =
  | (typeof daoProposalsRecord.multisig)[number]
  | (typeof daoProposalsRecord.token)[number]
  | (typeof daoProposalsRecord.nft)[number];

export const proposalTitle: Record<ProposalType, string> = {
  text: 'Text proposal',
  metadata: 'Update metadata',
  config: 'Update configuration',
  upgrade: 'Upgrade',
  assets: 'Update whitelisted assets',
  nfts: 'Update whitelisted NFTs',
  execute: 'Execute message',
  members: 'Update multisig members',
  spend: 'Spend treasury',
  mint: 'Mint token',
  mintNft: 'Mint NFT',
  burn: 'Burn token',
  delegate: 'Delegate LUNA',
  undelegate: 'Undelegate LUNA',
  redelegate: 'Redelegate LUNA',
  council: 'Update council',
  minWeightForRewards: 'Update minimum weight for rewards',
};

export const proposalActionTypeName = [
  'metadata',
  'gov',
  'council',
  'assets',
  'nfts',
  'funding',
  'upgrade',
  'execute',
  'members',
  'distribute',
  'min weight',
  'text',
  'other',
] as const;

export type ProposalActionTypeName = (typeof proposalActionTypeName)[number];

export const proposalActionShortName: Record<enterprise.ProposalActionType, ProposalActionTypeName> = {
  update_metadata: 'metadata',
  update_gov_config: 'gov',
  update_council: 'council',
  update_asset_whitelist: 'assets',
  update_nft_whitelist: 'nfts',
  request_funding_from_dao: 'funding',
  upgrade_dao: 'upgrade',
  execute_msgs: 'execute',
  modify_multisig_membership: 'members',
  distribute_funds: 'distribute',
  update_minimum_weight_for_rewards: 'min weight',
};

export const getProposalActionType = (action: enterprise.ProposalAction): enterprise.ProposalActionType => {
  return Object.keys(action)[0] as enterprise.ProposalActionType;
};

export type ProposalActionMsg =
  | enterprise.UpdateMetadataMsg
  | enterprise.UpdateGovConfigMsg
  | enterprise.UpdateCouncilMsg
  | enterprise.UpdateAssetWhitelistMsg
  | enterprise.UpdateNftWhitelistMsg
  | enterprise.RequestFundingFromDaoMsg
  | enterprise.UpgradeDaoMsg
  | enterprise.ExecuteMsgsMsg
  | enterprise.ModifyMultisigMembershipMsg;

export interface ProposalAction {
  type: enterprise.ProposalActionType;
  msg: ProposalActionMsg;
}

export const getProposalActionMsg = (action: enterprise.ProposalAction): ProposalActionMsg => {
  return Object.values(action)[0] as ProposalActionMsg;
};

export const getProposalTypeName = (proposal: Proposal): ProposalActionTypeName => {
  const { actions } = proposal;
  const action = actions[0];
  if (!action) {
    return 'text';
  }
  const type = getProposalActionType(action);
  if (!type) {
    return 'other';
  }

  return proposalActionShortName[type];
};

export const hasProposalExpired = (proposal: Proposal, blockHeight: number, timestamp: number) => {
  if ('at_time' in proposal.expires) {
    return Number(proposal.expires.at_time) / 1000000 < timestamp;
  }
  if ('at_height' in proposal.expires) {
    return Number(proposal.expires.at_height) < blockHeight;
  }
  return true;
};

export const getProposalEstimatedExpiry = (proposal: Proposal) => {
  if ('at_time' in proposal.expires) {
    return new Date(Number(proposal.expires.at_time) / 1000000);
  }

  // TODO: need to estimate the expiry time here
  return undefined;
};

export const proposalStatusNames = ['Active', 'Pending', 'Passed', 'Rejected', 'Executed'] as const;

type ProposalStatusName = (typeof proposalStatusNames)[number];

export const getProposalStatusName = (proposal: Proposal, blockHeight: number): ProposalStatusName => {
  if (proposal.status === 'in_progress' && hasProposalExpired(proposal, blockHeight, Date.now())) {
    return 'Pending';
  }

  return proposal.status === 'in_progress'
    ? 'Active'
    : proposal.status === 'passed'
    ? 'Passed'
    : proposal.status === 'rejected'
    ? 'Rejected'
    : 'Executed';
};

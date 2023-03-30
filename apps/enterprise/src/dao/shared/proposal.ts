import Big from 'big.js';
import { capitalizeFirstLetter } from 'lib/shared/utils/capitalizeFirstLetter';
import { DAO } from 'types';
import { enterprise } from 'types/contracts';

export const proposalTypes = ['general', 'council'] as const;


// TODO: Remove this when contracts version is updated after audit 
export type ProposalActionType =
  | 'update_metadata'
  | 'update_gov_config'
  | 'update_asset_whitelist'
  | 'update_nft_whitelist'
  | 'request_funding_from_dao'
  | 'upgrade_dao'
  | 'execute_msgs'
  | 'modify_multisig_membership';


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
] as const;

export const daoProposalsRecord = {
  multisig: [...sharedProposalTypes, 'members'] as const,
  token: [...sharedProposalTypes, 'mint', 'burn'] as const,
  nft: [...sharedProposalTypes, 'mintNft'] as const,
} as const;

export type ProposalType =
  | typeof daoProposalsRecord.multisig[number]
  | typeof daoProposalsRecord.token[number]
  | typeof daoProposalsRecord.nft[number];

export const proposalTitle: Record<ProposalType, string> = {
  text: 'Text proposal',
  metadata: 'Update metadata proposal',
  config: 'Update configuration proposal',
  upgrade: 'Upgrade proposal',
  assets: 'Update whitelisted assets',
  nfts: 'Update whitelisted NFTs',
  execute: 'Proposal to execute message',
  members: 'Update multisig members',
  spend: 'Spend treasury proposal',
  mint: 'Mint token proposal',
  mintNft: 'Mint NFT proposal',
  burn: 'Burn token proposal',
  delegate: 'Delegate LUNA proposal',
  undelegate: 'Undelegate LUNA proposal',
  redelegate: 'Redelegate LUNA proposal',
};

export const proposalActionShortName: Record<ProposalActionType, string> = {
  update_metadata: 'metadata',
  update_gov_config: 'gov',
  update_asset_whitelist: 'assets',
  update_nft_whitelist: 'nfts',
  request_funding_from_dao: 'funding',
  upgrade_dao: 'upgrade',
  execute_msgs: 'execute',
  modify_multisig_membership: 'members',
  distribute_funds: 'distribute',
};

export const getProposalActionType = (action: enterprise.ProposalAction): ProposalActionType => {
  return Object.keys(action)[0] as ProposalActionType;
};

export type ProposalActionMsg =
  | enterprise.UpdateMetadataMsg
  | enterprise.UpdateGovConfigMsg
  | enterprise.UpdateAssetWhitelistMsg
  | enterprise.UpdateNftWhitelistMsg
  | enterprise.RequestFundingFromDaoMsg
  | enterprise.UpgradeDaoMsg
  | enterprise.ExecuteMsgsMsg
  | enterprise.ModifyMultisigMembershipMsg;

export interface ProposalAction {
  type: ProposalActionType;
  msg: ProposalActionMsg;
}

export const getProposalActionMsg = (action: enterprise.ProposalAction): ProposalActionMsg => {
  return Object.values(action)[0] as ProposalActionMsg;
};

export const getProposalTypeName = (proposal: Proposal) => {
  const { actions } = proposal;
  const action = actions[0];
  if (!action) {
    return 'Text';
  }
  const type = getProposalActionType(action);
  if (!type) {
    return 'Other';
  }

  return capitalizeFirstLetter(proposalActionShortName[type]);
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

export type ProposalStatusName = 'Active' | 'Pending' | 'Passed' | 'Rejected' | 'Executed';

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

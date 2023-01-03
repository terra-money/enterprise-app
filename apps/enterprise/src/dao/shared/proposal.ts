import { capitalizeFirstLetter } from 'lib/shared/utils/capitalizeFirstLetter';
import { Proposal } from 'types';
import { enterprise } from 'types/contracts';

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
  'council',
] as const;

export const daoProposalsRecord = {
  multisig: [...sharedProposalTypes, 'members'] as const,
  token: [...sharedProposalTypes, 'mint', 'burn'] as const,
  nft: sharedProposalTypes,
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
  burn: 'Burn token proposal',
  delegate: 'Delegate LUNA proposal',
  undelegate: 'Undelegate LUNA proposal',
  council: 'Update council',
};

export const proposalVotingTypes = ['regular', 'council'] as const;

export type ProposalVotingType = typeof proposalVotingTypes[number];

export const proposalActionShortName: Record<enterprise.ProposalActionType, string> = {
  update_metadata: 'metadata',
  update_gov_config: 'gov',
  update_council: 'council',
  update_asset_whitelist: 'assets',
  update_nft_whitelist: 'nfts',
  request_funding_from_dao: 'funding',
  upgrade_dao: 'upgrade',
  execute_msgs: 'execute',
  modify_multisig_membership: 'members',
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

export const getProposalTypeName = (proposal: Proposal) => {
  const { proposal_actions } = proposal;
  const action = proposal_actions[0];
  if (!action) {
    return 'Text';
  }
  const type = getProposalActionType(action);
  if (!type) {
    return 'Other';
  }

  return capitalizeFirstLetter(proposalActionShortName[type]);
};

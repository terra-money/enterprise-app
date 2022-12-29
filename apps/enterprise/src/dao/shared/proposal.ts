const sharedProposalTypes = [
  'text',
  'config',
  'upgrade',
  'assets',
  'nfts',
  'execute',
  'spend',
  'delegate',
  'council',
] as const;

const daoProposalsRecord = {
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
  council: 'Update council',
};

export const proposalVotingTypes = ['regular', 'council'] as const;

export type ProposalVotingType = typeof proposalVotingTypes[number];

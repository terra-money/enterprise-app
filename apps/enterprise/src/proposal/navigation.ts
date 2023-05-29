import { getDaoPath } from 'navigation';
import { enterprise } from 'types/contracts';

interface CreateUpgradeProposalPathParams {
  daoAddress: string;
  votingType: enterprise.ProposalType;
}

interface ProposalPathParams {
  daoAddress: string;
  proposalId: number;
}

export const getProposalPath = ({ daoAddress, proposalId }: ProposalPathParams) =>
  `${getDaoPath(daoAddress)}/proposals/${proposalId}`;

export const getCreateUpgradeProposalPath = ({ daoAddress, votingType }: CreateUpgradeProposalPathParams) =>
  `${getDaoPath(daoAddress)}/proposals/create/upgrade?votingType=${votingType}`;

import Big from 'big.js';
import { Proposal } from 'dao/shared/proposal';
import { DAO } from 'types';
import { enterprise } from 'types/contracts';

export interface ProposalApiResponse {
  daoAddress: string;
  executionTxHash?: string;
  id: number;
  created: number;
  started_at: number;
  title: string;
  description: string;
  expires: enterprise.Expiration;
  status: enterprise.ProposalStatus;
  proposalActions: enterprise.ProposalAction[];
  yesVotes: string;
  noVotes: string;
  abstainVotes: string;
  vetoVotes: string;
  totalVotes: string;
  type: enterprise.ProposalType;
  proposer?: string;
}

export const apiResponseToProposal = (proposal: ProposalApiResponse, dao: DAO): Proposal => {
  return {
    dao,
    ...proposal,
    actions: proposal.proposalActions,
    yesVotes: Big(proposal.yesVotes),
    noVotes: Big(proposal.noVotes),
    abstainVotes: Big(proposal.abstainVotes),
    vetoVotes: Big(proposal.vetoVotes),
    totalVotes: Big(proposal.totalVotes),
    // TODO: remove after updating indexers
    type: proposal.type || 'general',
    proposer: proposal.proposer,
  };
};

import { Expiration, ProposalStatus, ProposalAction, ProposalType } from 'types/enterprise_facade';

export type Entity = {
  _type: string;
  daoAddress: string;
  executionTxHash?: string;
  id: number;
  created: number;
  started_at: number;
  title: string;
  description: string;
  expires: Expiration;
  status: ProposalStatus;
  proposalActions: ProposalAction[];
  yesVotes: string;
  noVotes: string;
  abstainVotes: string;
  vetoVotes: string;
  totalVotes: string;
  type: ProposalType;
  proposer?: string;
};

export interface ProposalKey {
  daoAddress: string;
  id: number;
}

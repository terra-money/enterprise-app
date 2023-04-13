import { enterprise } from 'types/contracts';

export type Entity = {
  _type: string;
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
};

export interface ProposalKey {
  daoAddress: string;
  id: number;
}

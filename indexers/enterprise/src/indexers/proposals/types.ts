import { enterprise_facade } from 'types/contracts';

export type Entity = {
  _type: string;
  daoAddress: string;
  executionTxHash?: string;
  id: number;
  created: number;
  started_at: number;
  title: string;
  description: string;
  expires: enterprise_facade.Expiration;
  status: enterprise_facade.ProposalStatus;
  proposalActions: enterprise_facade.ProposalAction[];
  yesVotes: string;
  noVotes: string;
  abstainVotes: string;
  vetoVotes: string;
  totalVotes: string;
  type: enterprise_facade.ProposalType;
  proposer?: string;
};

export interface ProposalKey {
  daoAddress: string;
  id: number;
}

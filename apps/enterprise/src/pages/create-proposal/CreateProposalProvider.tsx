import { getValueProviderSetup } from '@terra-money/apps/utils';
import { enterprise } from 'types/contracts';

interface CreateProposalState {
  proposalVotingType: enterprise.ProposalType;
}

export const { provider: CreateProposalProvider, useValue: useCreateProposal } =
  getValueProviderSetup<CreateProposalState>('CreateProposalState');

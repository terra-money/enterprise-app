import { getValueProviderSetup } from '@terra-money/apps/utils';
import { ProposalVotingType } from './SelectProposalTypePage';

interface CreateProposalState {
  proposalVotingType: ProposalVotingType;
}

export const { provider: CreateProposalProvider, useValue: useCreateProposal } =
  getValueProviderSetup<CreateProposalState>('CreateProposalState');

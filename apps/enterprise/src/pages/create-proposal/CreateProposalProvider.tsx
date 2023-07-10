import { getValueProviderSetup } from 'lib/shared/utils/getValueProviderSetup';
import { enterprise } from 'types/contracts';

interface CreateProposalState {
  proposalVotingType: enterprise.ProposalType;
}

export const { provider: CreateProposalProvider, useValue: useCreateProposal } =
  getValueProviderSetup<CreateProposalState>('CreateProposalState');

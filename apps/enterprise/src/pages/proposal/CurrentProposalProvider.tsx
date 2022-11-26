import { getValueProviderSetup } from '@terra-money/apps/utils';
import { Proposal } from 'types/Proposal';

export const { useValue: useCurrentProposal, provider: CurrentProposalProvider } =
  getValueProviderSetup<Proposal>('Proposal');

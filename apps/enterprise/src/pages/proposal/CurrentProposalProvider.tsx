import { getValueProviderSetup } from '@terra-money/apps/utils';
import { Proposal } from 'dao/shared/proposal';

export const { useValue: useCurrentProposal, provider: CurrentProposalProvider } =
  getValueProviderSetup<Proposal>('Proposal');

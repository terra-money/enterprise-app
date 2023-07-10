import { getValueProviderSetup } from 'lib/shared/utils/getValueProviderSetup';
import { Proposal } from 'dao/shared/proposal';

export const { useValue: useCurrentProposal, provider: CurrentProposalProvider } =
  getValueProviderSetup<Proposal>('Proposal');

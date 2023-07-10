import { getValueProviderSetup } from 'lib/shared/utils/getValueProviderSetup';
import { ProposalAction } from 'dao/shared/proposal';

export const { useValue: useCurrentProposalAction, provider: CurrentProposalActionProvider } =
  getValueProviderSetup<ProposalAction>('ProposalAction');

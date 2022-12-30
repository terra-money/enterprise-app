import { getValueProviderSetup } from '@terra-money/apps/utils';
import { ProposalAction } from 'dao/shared/proposal';

export const { useValue: useCurrentProposalAction, provider: CurrentProposalActionProvider } =
  getValueProviderSetup<ProposalAction>('ProposalAction');

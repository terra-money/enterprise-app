import { Text } from 'components/primitives';
import { useCurrentProposal } from './CurrentProposalProvider';

export const ProposalSummaryText = () => {
  const proposal = useCurrentProposal();
  return <Text variant="text">{proposal.description}</Text>;
};

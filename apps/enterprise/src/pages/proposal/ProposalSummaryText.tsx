import { Text } from 'lib/ui/Text';
import { useCurrentProposal } from './CurrentProposalProvider';

export const ProposalSummaryText = () => {
  const proposal = useCurrentProposal();
  return (
    <Text size={14} color="supporting">
      {proposal.description}
    </Text>
  );
};

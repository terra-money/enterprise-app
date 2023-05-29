import { Text } from 'lib/ui/Text';
import { useCurrentProposal } from './CurrentProposalProvider';
import { Address } from 'components/address';
import { HStack } from 'lib/ui/Stack';

export const ProposedBy = () => {
  const { proposer } = useCurrentProposal();

  if (!proposer) return null;

  return (
    <HStack gap={4} alignItems="center">
      <Text color="supporting3">Proposed by:</Text>
      <Address address={proposer} />
    </HStack>
  );
};

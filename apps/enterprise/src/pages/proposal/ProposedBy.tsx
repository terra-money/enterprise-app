import { Text } from 'lib/ui/Text';
import { useCurrentProposal } from './CurrentProposalProvider';
import { HStack } from 'lib/ui/Stack';
import { Address } from 'chain/components/Address';

export const ProposedBy = () => {
  const { proposer } = useCurrentProposal();

  if (!proposer) return null;

  return (
    <HStack gap={4} alignItems="center">
      <Text color="shy">Proposed by:</Text>
      <Address value={proposer} />
    </HStack>
  );
};

import { DAOLogo } from 'components/dao-logo';
import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useCurrentProposal } from './CurrentProposalProvider';

export const SmallScreenProposalHeader = () => {
  const dao = useCurrentDao();
  const proposal = useCurrentProposal();

  return (
    <VStack gap={24}>
      <HStack gap={8}>
        <DAOLogo logo={dao.logo} />
      </HStack>
      <Text size={24} weight="bold">
        {proposal.title}
      </Text>
    </VStack>
  );
};

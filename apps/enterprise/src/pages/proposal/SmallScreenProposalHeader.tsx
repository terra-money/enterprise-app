import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useCurrentProposal } from './CurrentProposalProvider';
import { DaoLogoLink } from 'components/dao-logo/DaoLogoLink';

export const SmallScreenProposalHeader = () => {
  const proposal = useCurrentProposal();

  return (
    <VStack gap={24}>
      <HStack gap={8}>
        <DaoLogoLink address={proposal.dao.address} size="s" logo={proposal.dao.logo} />
      </HStack>
      <Text size={24} weight="bold">
        <Text style={{ marginRight: 8 }} as="span" color="shy">
          #{proposal.id}
        </Text>
        {proposal.title}
      </Text>
    </VStack>
  );
};

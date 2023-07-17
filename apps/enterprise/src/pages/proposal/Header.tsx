import { HStack, VStack } from 'lib/ui/Stack';
import { ProposalTags } from 'pages/shared/ProposalTags';
import { forwardRef, Ref } from 'react';
import { useCurrentProposal } from './CurrentProposalProvider';
import { Text } from 'lib/ui/Text';
import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { getDaoPath } from 'navigation';
import { ShyLinkText } from 'lib/ui/Text/ShyLinkText';
import { DAOLogo } from 'components/dao-logo';

interface HeaderProps {
  className?: string;
}

export const Header = forwardRef((props: HeaderProps, ref: Ref<HTMLDivElement>) => {
  const proposal = useCurrentProposal();

  const { dao } = proposal;

  return (
    <VStack gap={16}>
      <InternalLink to={getDaoPath(proposal.dao.address)}>
        <ShyLinkText>Back</ShyLinkText>
      </InternalLink>
      <HStack alignItems="center" gap={20}>
        <HStack alignItems="center" gap={8}>
          <InternalLink to={getDaoPath(proposal.dao.address)}>
            <DAOLogo size="m" logo={dao.logo} />
          </InternalLink>
          <Text as="h1">
            <Text style={{ marginRight: 8 }} as="span" color="shy">
              #{proposal.id}
            </Text>
            {proposal.title}
          </Text>
          <ProposalTags proposal={proposal} />
        </HStack>
      </HStack>
    </VStack>
  );
});

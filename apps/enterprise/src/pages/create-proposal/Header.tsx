import { HStack, VStack } from 'lib/ui/Stack';
import { DAOLogo } from 'components/dao-logo';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { getDaoLogo } from 'dao/utils/getDaoLogo';
import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { getDaoPath } from 'navigation/Path';
import { ShyLinkText } from 'lib/ui/Text/ShyLinkText';
import { Text } from 'lib/ui/Text';

interface HeaderProps {
  className?: string;
  compact?: boolean;
  title: string;
}

export const Header = (props: HeaderProps) => {
  const dao = useCurrentDao();
  const { title } = props;

  return (
    <VStack gap={16}>
      <InternalLink to={getDaoPath(dao.address)}>
        <ShyLinkText>Back</ShyLinkText>
      </InternalLink>
      <HStack alignItems="center" gap={8}>
        <InternalLink to={getDaoPath(dao.address)}>
          <DAOLogo size="m" logo={getDaoLogo(dao)} />
        </InternalLink>
        <Text as="h1">{title}</Text>
      </HStack>
    </VStack>
  );
};

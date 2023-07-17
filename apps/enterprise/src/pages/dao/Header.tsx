import { HStack } from 'lib/ui/Stack';
import { DAOLogo } from 'components/dao-logo';
import { FavouriteToggle } from 'components/favourite-toggle';
import { VStack } from 'lib/ui/Stack';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { DaoNavigation } from './DaoNavigation';
import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { Path } from 'navigation';
import { getDaoLogo } from 'dao/utils/getDaoLogo';
import { toDao } from 'dao/utils/toDao';
import { SeparatedByLine } from 'lib/ui/SeparatedByLine';
import { Text } from 'lib/ui/Text';
import { ShyLinkText } from 'lib/ui/Text/LinkText';

export const Header = () => {
  const dao = useCurrentDao();

  return (
    <SeparatedByLine fullWidth gap={20}>
      <VStack gap={16}>
        <InternalLink to={Path.Daos}>
          <ShyLinkText>Back</ShyLinkText>
        </InternalLink>
        <HStack alignItems="center" gap={20}>
          <HStack alignItems="center" gap={8}>
            <DAOLogo size="m" logo={getDaoLogo(dao)} />
            <FavouriteToggle dao={toDao(dao)} />
          </HStack>
          <Text as="h1">{dao.metadata.name}</Text>
        </HStack>
        {dao.metadata.description && <Text color="supporting">{dao.metadata.description}</Text>}
      </VStack>
      <DaoNavigation />
    </SeparatedByLine>
  );
};

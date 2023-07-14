import { DAOLogo } from 'components/dao-logo';
import { FavouriteToggle } from 'components/favourite-toggle';
import { Line } from 'lib/ui/Line';
import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { DaoNavigation } from './DaoNavigation';
import { getDaoLogo } from 'dao/utils/getDaoLogo';
import { toDao } from 'dao/utils/toDao';

export const MobileDaoHeader = () => {
  const dao = useCurrentDao();

  return (
    <VStack gap={24}>
      <HStack gap={8}>
        <FavouriteToggle dao={toDao(dao)} />
        <DAOLogo size="s" logo={getDaoLogo(dao)} />
      </HStack>
      <Text size={24} weight="bold">
        {dao.metadata.name}
      </Text>
      {dao.metadata.description && <Text color="supporting">{dao.metadata.description}</Text>}
      <Line />
      <DaoNavigation />
    </VStack>
  );
};

import { DAOLogo } from 'components/dao-logo';
import { FavouriteToggle } from 'components/favourite-toggle';
import { Line } from 'lib/ui/Line';
import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';
import { DaoNavigation } from './DaoNavigation';

export const MobileDaoHeader = () => {
  const dao = useCurrentDao();

  return (
    <VStack gap={24}>
      <HStack gap={8}>
        <FavouriteToggle size="small" dao={dao} />
        <DAOLogo logo={dao.logo} />
      </HStack>
      <Text size={24} weight="bold">
        {dao.name}
      </Text>
      <Line />
      <DaoNavigation />
    </VStack>
  );
};

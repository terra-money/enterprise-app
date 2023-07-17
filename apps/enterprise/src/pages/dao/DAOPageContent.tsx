import { Header } from './Header';
import { Outlet } from 'react-router';
import { useDAOQuery } from 'queries/useDAOQuery';

import { CurrentDaoProvider } from 'dao/components/CurrentDaoProvider';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { MobileDaoHeader } from './MobileDaoHeader';
import { useCurrentDaoAddress } from 'dao/navigation';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { Center } from 'lib/ui/Center';
import { Spinner } from 'lib/ui/Spinner';
import { Text } from 'lib/ui/Text';
import { PageLayout } from 'components/PageLayout';
import { StickyWalletManager } from 'chain/components/StickyWalletManager';

export const DAOPageContent = () => {
  const address = useCurrentDaoAddress();

  const { data: dao, status } = useDAOQuery(address);

  return (
    <QueryDependant
      data={dao}
      status={status}
      loading={() => (
        <Center>
          <Spinner />
        </Center>
      )}
      error={() => (
        <Center>
          <Text>Failed to load DAO {address}</Text>
        </Center>
      )}
      success={(dao) => (
        <CurrentDaoProvider value={dao}>
          <ResponsiveView
            small={() => (
              <VStack gap={24}>
                <MobileDaoHeader />
                <Outlet />
              </VStack>
            )}
            normal={() => (
              <PageLayout>
                <Header />
                <StickyWalletManager />
                <Outlet />
              </PageLayout>
            )}
          />
        </CurrentDaoProvider>
      )}
    />
  );
};

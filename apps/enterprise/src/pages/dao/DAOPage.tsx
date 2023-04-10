import { ScrollableContainer, StickyHeader } from '@terra-money/apps/components';
import { useRef } from 'react';
import { Header } from './Header';
import { Outlet } from 'react-router';
import { useDAOQuery } from 'queries/useDAOQuery';
import { CW20Addr } from '@terra-money/apps/types';
import { LoadingPage } from 'pages/shared/LoadingPage';
import { PageLayout } from 'components/layout';
import { CurrentDaoProvider } from 'dao/components/CurrentDaoProvider';
import { Navigation } from 'components/Navigation';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { MobileDaoHeader } from './MobileDaoHeader';
import { useCurrentDaoAddress } from 'dao/navigation';

export const DAOPage = () => {
  const address = useCurrentDaoAddress()

  const { data: dao, isLoading } = useDAOQuery(address as CW20Addr);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Navigation>
      <LoadingPage isLoading={isLoading}>
        {dao && (
          <CurrentDaoProvider value={dao}>
            <ResponsiveView
              small={() => (
                <VStack gap={24}>
                  <MobileDaoHeader />
                  <Outlet />
                </VStack>
              )}
              normal={() => (
                <ScrollableContainer
                  stickyRef={ref}
                  header={(visible) => (
                    <StickyHeader visible={visible}>
                      <Header compact={true} />
                    </StickyHeader>
                  )}
                >
                  <PageLayout header={<Header ref={ref} />}>
                    <Outlet />
                  </PageLayout>
                </ScrollableContainer>
              )}
            />
          </CurrentDaoProvider>
        )}
      </LoadingPage>
    </Navigation>
  );
};

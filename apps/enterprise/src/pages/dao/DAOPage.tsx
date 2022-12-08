import { ScrollableContainer, StickyHeader } from '@terra-money/apps/components';
import { useRef } from 'react';
import { Header } from './Header';
import { Outlet, useParams } from 'react-router';
import { useDAOQuery } from 'queries/useDAOQuery';
import { CW20Addr } from '@terra-money/apps/types';
import { LoadingPage } from 'pages/shared/LoadingPage';
import { PageLayout } from 'components/layout';
import { CurrentDaoProvider } from 'pages/shared/CurrentDaoProvider';
import { Navigation } from 'components/Navigation';
import { ResponsiveView } from 'lib/ui/ResponsiveView';

export const DAOPage = () => {
  const { address } = useParams();

  const { data: dao, isLoading } = useDAOQuery(address as CW20Addr);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Navigation>
      <LoadingPage isLoading={isLoading}>
        {dao && (
          <CurrentDaoProvider value={dao}>
            <ResponsiveView
              small={() => <Outlet context={{ dao, isLoading }} />}
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
                    <Outlet context={{ dao, isLoading }} />
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

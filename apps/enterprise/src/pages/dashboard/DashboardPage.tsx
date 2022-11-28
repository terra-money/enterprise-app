import { ScrollableContainer, StickyHeader } from '@terra-money/apps/components';
import { NavigationLayout } from 'components/layout/NavigationLayout';
import { Text } from 'components/primitives';
import { useRef } from 'react';
import { Overview } from './Overview';
import { RecentProposals } from './RecentProposals';
import { PageLayout } from 'components/layout';
import { RecentDAOs } from './RecentDAOs';

export const DashboardPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <NavigationLayout>
      <ScrollableContainer stickyRef={ref} header={(visible) => <StickyHeader visible={visible}></StickyHeader>}>
        <PageLayout header={<Text variant="heading2">Dashboard</Text>}>
          <Overview />
          <RecentDAOs />
          <RecentProposals />
        </PageLayout>
      </ScrollableContainer>
    </NavigationLayout>
  );
};

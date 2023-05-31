import { ScrollableContainer, StickyHeader } from '@terra-money/apps/components';
import { useRef } from 'react';
import { Overview } from './Overview';
import { RecentProposals } from './RecentProposals';
import { PageLayout } from 'components/layout';
import { RecentDAOs } from './RecentDAOs';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';

export const DashboardPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  const content = (
    <>
      <Overview />
      <RecentDAOs />
      <RecentProposals />
    </>
  );

  return (
    <ResponsiveView
      normal={() => (
        <ScrollableContainer stickyRef={ref} header={(visible) => <StickyHeader visible={visible}></StickyHeader>}>
          <PageLayout
            header={
              <Text weight="bold" size={32}>
                Dashboard
              </Text>
            }
          >
            {content}
          </PageLayout>
        </ScrollableContainer>
      )}
      small={() => (
        <VStack gap={24}>
          <Text weight="bold" size={24}>
            Dashboard
          </Text>
          {content}
        </VStack>
      )}
    />
  );
};

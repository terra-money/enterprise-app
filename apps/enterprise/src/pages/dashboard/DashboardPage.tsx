import { Overview } from './Overview';
import { RecentProposals } from './RecentProposals';
import { RecentDAOs } from './TopDAOs';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { PageLayout } from 'components/PageLayout';
import { StickyWalletManager } from 'chain/components/StickyWalletManager';

export const DashboardPage = () => {
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
        <PageLayout>
          <Text weight="bold" size={32}>
            Dashboard
          </Text>
          <StickyWalletManager />
          {content}
        </PageLayout>
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

import { ScrollableContainer, StickyHeader } from '@terra-money/apps/components';
import { useRef } from 'react';
import { LoadingPage } from 'pages/shared/LoadingPage';
import { useParams } from 'react-router-dom';
import { useDAOQuery, useProposalQuery } from 'queries';
import { CW20Addr } from '@terra-money/apps/types';
import { Header } from './Header';
import { ProposalVoting } from './ProposalVoting';
import { ProposalVotes } from './ProposalVotes';
import { CurrentProposalProvider } from './CurrentProposalProvider';
import { ProposalActions } from './ProposalActions';
import { PageLayout } from 'components/layout';
import { ProposalSummaryText } from './ProposalSummaryText';
import { CurrentDaoProvider } from 'dao/components/CurrentDaoProvider';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { SmallScreenProposalHeader } from './SmallScreenProposalHeader';
import { ProposedBy } from './ProposedBy';

export const ProposalPageContent = () => {
  const { id, address } = useParams();
  const proposalId = Number(id);

  const { data: dao } = useDAOQuery(address as CW20Addr);

  const { data: proposal, isLoading } = useProposalQuery({
    daoAddress: address as CW20Addr,
    id: proposalId,
  });

  const ref = useRef<HTMLDivElement>(null);

  const content = (
    <>
      <ProposedBy />
      <ProposalSummaryText />
      <ProposalActions />
      <ProposalVoting />
      <ProposalVotes />
    </>
  );

  return (
    <LoadingPage isLoading={isLoading}>
      {dao && (
        <CurrentDaoProvider value={dao}>
          {proposal && (
            <CurrentProposalProvider value={proposal}>
              <ResponsiveView
                normal={() => (
                  <ScrollableContainer
                    stickyRef={ref}
                    threshold={0.5}
                    header={(visible) => (
                      <StickyHeader visible={visible}>
                        <Header compact={true} />
                      </StickyHeader>
                    )}
                  >
                    <PageLayout header={<Header ref={ref} />}>{content}</PageLayout>
                  </ScrollableContainer>
                )}
                small={() => (
                  <VStack gap={24}>
                    <SmallScreenProposalHeader />
                    {content}
                  </VStack>
                )}
              />
            </CurrentProposalProvider>
          )}
        </CurrentDaoProvider>
      )}
    </LoadingPage>
  );
};

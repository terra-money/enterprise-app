import { ScrollableContainer, StickyHeader } from '@terra-money/apps/components';
import { NavigationLayout } from 'components/layout/NavigationLayout';
import { useRef } from 'react';
import { LoadingPage } from 'pages/shared/LoadingPage';
import { useParams } from 'react-router-dom';
import { useProposalQuery } from 'queries';
import { CW20Addr } from '@terra-money/apps/types';
import { Header } from './Header';
import { ProposalVoting } from './ProposalVoting';
import { ProposalVotes } from './ProposalVotes';
import { CurrentProposalProvider } from './CurrentProposalProvider';
import { ProposalActions } from './ProposalActions';
import { PageLayout } from 'components/layout';
import { ProposalSummaryText } from './ProposalSummaryText';
import { CurrentDaoProvider } from 'pages/shared/CurrentDaoProvider';

export const Page = () => {
  const { id, address } = useParams();
  const proposalId = Number(id);

  const { data: proposal, isLoading } = useProposalQuery({
    daoAddress: address as CW20Addr,
    id: proposalId,
  });

  const ref = useRef<HTMLDivElement>(null);

  return (
    <NavigationLayout>
      <LoadingPage isLoading={isLoading}>
        {proposal && (
          <CurrentDaoProvider value={proposal.dao}>
            <CurrentProposalProvider value={proposal}>
              <ScrollableContainer
                stickyRef={ref}
                threshold={0.5}
                header={(visible) => (
                  <StickyHeader visible={visible}>
                    <Header compact={true} />
                  </StickyHeader>
                )}
              >
                <PageLayout header={<Header ref={ref} />}>
                  <ProposalSummaryText />
                  <ProposalActions />
                  <ProposalVoting />
                  <ProposalVotes />
                </PageLayout>
              </ScrollableContainer>
            </CurrentProposalProvider>
          </CurrentDaoProvider>
        )}
      </LoadingPage>
    </NavigationLayout>
  );
};

import { ScrollableContainer, StickyHeader } from '@terra-money/apps/components';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDAOQuery, useProposalQuery } from 'queries';

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
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { Center } from 'lib/ui/Center';
import { Spinner } from 'lib/ui/Spinner';
import { Text } from 'lib/ui/Text';

export const ProposalPageContent = () => {
  const { id, address } = useParams();
  const proposalId = Number(id);

  const { data: dao, status: daoQueryStatus } = useDAOQuery(assertDefined(address));

  const { data: proposal, status: proposalQueryStatus } = useProposalQuery({
    daoAddress: assertDefined(address),
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
    <QueryDependant
      data={dao}
      status={daoQueryStatus}
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
          <QueryDependant
            data={proposal}
            status={proposalQueryStatus}
            loading={() => (
              <Center>
                <Spinner />
              </Center>
            )}
            error={() => (
              <Center>
                <Text>Failed to load proposal {proposalId}</Text>
              </Center>
            )}
            success={(proposal) => (
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
          />
        </CurrentDaoProvider>
      )}
    />
  );
};

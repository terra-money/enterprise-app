import { LabeledPageSection } from 'lib/ui/LabeledPageSection';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { QUERY_KEY, useProposalsQuery } from 'queries';
import { ProposalCard } from '../shared/ProposalCard';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { Spinner } from 'lib/ui/Spinner';
import { Text } from 'lib/ui/Text';
import { CurrentProposalProvider } from 'pages/proposal/CurrentProposalProvider';

export const RecentProposals = () => {
  const { data, status } = useProposalsQuery({
    limit: 12,
    direction: 'desc',
    queryKey: QUERY_KEY.RECENT_PROPOSALS,
  });

  return (
    <LabeledPageSection name="Recent proposals">
      <QueryDependant
        data={data}
        status={status}
        loading={() => <Spinner />}
        error={() => <Text>Failed to load</Text>}
        success={(proposals) => (
          <SameWidthChildrenRow maxColumns={3} fullWidth minChildrenWidth={320} gap={16}>
            {proposals.map((proposal, index) => (
              <CurrentProposalProvider key={proposal.id} value={proposal}>
                <ProposalCard showDao />
              </CurrentProposalProvider>
            ))}
          </SameWidthChildrenRow>
        )}
      />
    </LabeledPageSection>
  );
};

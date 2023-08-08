import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { ProposalCard } from '../shared/ProposalCard';
import { useCurrentDaoAddress } from 'dao/navigation';
import { useDaoProposalsQuery } from 'queries/useDaoProposalsQuery';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { LabeledPageSection } from 'lib/ui/LabeledPageSection';
import { Spinner } from 'lib/ui/Spinner';
import { CurrentProposalProvider } from 'pages/proposal/CurrentProposalProvider';
import { Text } from 'lib/ui/Text';

export const RecentProposals = () => {
  const address = useCurrentDaoAddress();

  const { data, status } = useDaoProposalsQuery({ address });

  return (
    <LabeledPageSection name="Recent proposals">
      <QueryDependant
        data={data}
        status={status}
        loading={() => <Spinner />}
        error={() => <Text>Failed to load</Text>}
        success={(proposals) => (
          <SameWidthChildrenRow maxColumns={3} fullWidth minChildrenWidth={320} gap={16}>
            {proposals
              .sort((a, b) => b.id - a.id)
              .slice(0, 6)
              .map((proposal, index) => (
                <CurrentProposalProvider key={proposal.id} value={proposal}>
                  <ProposalCard />
                </CurrentProposalProvider>
              ))}
          </SameWidthChildrenRow>
        )}
      />
    </LabeledPageSection>
  );
};

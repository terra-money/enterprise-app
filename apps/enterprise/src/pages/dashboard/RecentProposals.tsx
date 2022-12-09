import { LabeledPageSection } from 'lib/ui/LabeledPageSection';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { QUERY_KEY, useProposalsQuery } from 'queries';
import { ProposalCard } from '../shared/ProposalCard';

export const RecentProposals = () => {
  const { data: proposals = [], isLoading } = useProposalsQuery({
    limit: 12,
    direction: 'desc',
    queryKey: QUERY_KEY.RECENT_PROPOSALS,
  });

  if (isLoading === false && proposals.length === 0) {
    return null;
  }

  return (
    <LabeledPageSection name="Recent proposals">
      <SameWidthChildrenRow maxColumns={3} fullWidth minChildrenWidth={320} gap={16}>
        {isLoading ? (
          <>
            {[...Array(12)].map((_, index) => {
              return <ProposalCard key={index} />;
            })}
          </>
        ) : (
          <>
            {proposals.map((proposal, index) => (
              <ProposalCard key={index} proposal={proposal} />
            ))}
          </>
        )}
      </SameWidthChildrenRow>
    </LabeledPageSection>
  );
};

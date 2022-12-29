import { Text } from 'components/primitives';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { VStack } from 'lib/ui/Stack';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useProposalsQuery } from 'queries';
import { ProposalCard } from '../shared/ProposalCard';

const LIMIT = 6;

export const RecentProposals = () => {
  const dao = useCurrentDao();

  const { data: proposals } = useProposalsQuery({
    daoAddress: dao?.address,
    limit: LIMIT,
    enabled: Boolean(dao?.address),
  });

  if (proposals !== undefined && proposals.length === 0) {
    return null;
  }

  return (
    <VStack gap={16}>
      <Text variant="heading4">Recent Proposals</Text>
      <SameWidthChildrenRow gap={16} minChildrenWidth={320}>
        {proposals === undefined ? (
          <>
            {[...Array(LIMIT)].map((_, index) => {
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
    </VStack>
  );
};

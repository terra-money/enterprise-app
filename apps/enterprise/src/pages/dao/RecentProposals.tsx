import { Text } from 'components/primitives';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { VStack } from 'lib/ui/Stack';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useProposalsQuery } from 'queries';
import { ProposalCard } from '../shared/ProposalCard';

export const RecentProposals = () => {
  const dao = useCurrentDao();

  const { data: proposals } = useProposalsQuery({
    daoAddress: dao?.address,
    enabled: Boolean(dao?.address),
    direction: 'desc'
  });

  if (proposals !== undefined && proposals.length === 0) {
    return null;
  }


  const renderProposals = () => {
    if (proposals === undefined) {
      return (
        [...Array(6)].map((_, index) => {
          return <ProposalCard key={index} />;
        })
      );
    }

    const proposalsToDisplay = [...proposals].sort((a, b) => b.id - a.id).slice(0, 6)

    return (
      proposalsToDisplay.map((proposal, index) => (
        <ProposalCard key={index} proposal={proposal} />
      ))
    );
  };

  return (
    <VStack gap={16}>
      <Text variant="heading4">Recent Proposals</Text>
      <SameWidthChildrenRow gap={16} minChildrenWidth={320}>
        {renderProposals()}
      </SameWidthChildrenRow>
    </VStack>
  );
};

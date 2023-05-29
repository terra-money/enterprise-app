import { Text } from 'components/primitives';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { VStack } from 'lib/ui/Stack';
import { ProposalCard } from '../shared/ProposalCard';
import { useCurrentDaoAddress } from 'dao/navigation';
import { useDaoProposalsQuery } from 'queries/useDaoProposalsQuery';

export const RecentProposals = () => {
  const address = useCurrentDaoAddress();

  const { data: proposals } = useDaoProposalsQuery({ address });

  if (proposals !== undefined && proposals.length === 0) {
    return null;
  }

  const renderProposals = () => {
    if (proposals === undefined) {
      return [...Array(6)].map((_, index) => {
        return <ProposalCard key={index} />;
      });
    }

    const proposalsToDisplay = [...proposals].sort((a, b) => b.id - a.id).slice(0, 6);

    return proposalsToDisplay.map((proposal, index) => <ProposalCard key={index} proposal={proposal} />);
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

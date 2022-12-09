import { demicrofy } from '@terra-money/apps/libs/formatting';
import { usePaginatedResultItems } from '@terra-money/apps/queries';
import { CW20Addr } from '@terra-money/apps/types';
import { capitalizeFirstLetter } from '@terra-money/apps/utils';
import { Address } from 'components/address';
import { PaginatedView } from 'components/paginated-view';
import { Text } from 'components/primitives';
import { useIsSmallScreen } from 'lib/ui/hooks/useIsSmallScreen';
import { LabeledPageSection } from 'lib/ui/LabeledPageSection';
import { Panel } from 'lib/ui/Panel/Panel';
import { HStack, VStack } from 'lib/ui/Stack';
import { useCW20TokenInfoQuery } from 'queries';
import { useProposalVotesQuery } from 'queries/useProposalVotesQuery';
import { useCurrentProposal } from './CurrentProposalProvider';

// TODO: display date when contracts provide it
export const ProposalVotes = () => {
  const proposal = useCurrentProposal();

  const {
    data: proposalVotesPages,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useProposalVotesQuery({ proposalId: proposal.id, contract: proposal.dao.address as CW20Addr });

  const { data: token } = useCW20TokenInfoQuery(proposal.dao.membershipContractAddress);

  const votes = usePaginatedResultItems(proposalVotesPages, (response) => response.votes);

  const isSmallScreen = useIsSmallScreen();

  return votes.length === 0 ? null : (
    <LabeledPageSection name="Votes">
      <VStack gap={16}>
        <PaginatedView onRequestToLoadMore={fetchNextPage} isLoading={isLoading || isFetchingNextPage}>
          {votes?.map(({ outcome, amount, voter }, index) => (
            <Panel key={index}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text variant="heading4">{capitalizeFirstLetter(outcome)}</Text>
                <Address truncation={isSmallScreen ? [7, 4] : undefined} address={voter} />
                {token && <Text variant="text">{`${demicrofy(amount, token.decimals ?? 6)} ${token.symbol}`}</Text>}
              </HStack>
            </Panel>
          ))}
        </PaginatedView>
      </VStack>
    </LabeledPageSection>
  );
};

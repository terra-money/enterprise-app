import { demicrofy } from '@terra-money/apps/libs/formatting';
import { usePaginatedResultItems } from '@terra-money/apps/queries';
import { CW20Addr, u } from '@terra-money/apps/types';
import { capitalizeFirstLetter } from '@terra-money/apps/utils';
import Big from 'big.js';
import { Address } from 'components/address';
import { PaginatedView } from 'components/paginated-view';
import { Text } from 'components/primitives';
import { toPercents } from 'lib/shared/utils/toPercents';
import { useIsSmallScreen } from 'lib/ui/hooks/useIsSmallScreen';
import { LabeledPageSection } from 'lib/ui/LabeledPageSection';
import { Panel } from 'lib/ui/Panel/Panel';
import { HStack, VStack } from 'lib/ui/Stack';
import { useCW20TokenInfoQuery, useTokenStakingAmountQuery } from 'queries';
import { useProposalVotesQuery } from 'queries/useProposalVotesQuery';
import { useCurrentProposal } from './CurrentProposalProvider';

// TODO: display date when contracts provide it
export const ProposalVotes = () => {
  const proposal = useCurrentProposal();
  const { totalVotes, status, dao } = useCurrentProposal();
  const { data: totalStaked = Big(0) as u<Big> } = useTokenStakingAmountQuery(dao.address);

  const {
    data: proposalVotesPages,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useProposalVotesQuery({ proposalId: proposal.id, contract: proposal.dao.address as CW20Addr });

  const { data: token } = useCW20TokenInfoQuery(proposal.dao.membershipContractAddress);

  const votes = usePaginatedResultItems(proposalVotesPages, (response) => response.votes);

  const isSmallScreen = useIsSmallScreen();

  // TODO: reuse with ProposalVotingBar
  const totalAvailableVotes =
    dao.type === 'multisig' ? totalVotes : status === 'in_progress' ? totalStaked : totalVotes;

  return votes.length === 0 ? null : (
    <LabeledPageSection name="Votes">
      <VStack gap={16}>
        <PaginatedView onRequestToLoadMore={fetchNextPage} isLoading={isLoading || isFetchingNextPage}>
          {votes?.map(({ outcome, amount, voter }, index) => (
            <Panel key={index}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text variant="heading4">{capitalizeFirstLetter(outcome)}</Text>
                <Address truncation={isSmallScreen ? [7, 4] : undefined} address={voter} />
                {totalAvailableVotes.gt(0) && (
                  <Text variant="text">{toPercents(amount.div(totalAvailableVotes).toNumber())}</Text>
                )}
                {proposal.type !== 'council' && token && (
                  <Text variant="text">{`${demicrofy(amount, token.decimals ?? 6)} ${token.symbol}`}</Text>
                )}
              </HStack>
            </Panel>
          ))}
        </PaginatedView>
      </VStack>
    </LabeledPageSection>
  );
};

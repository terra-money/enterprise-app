import { demicrofy } from '@terra-money/apps/libs/formatting';
import { usePaginatedResultItems } from '@terra-money/apps/queries';
import { CW20Addr } from '@terra-money/apps/types';
import { capitalizeFirstLetter } from '@terra-money/apps/utils';
import { Address } from 'components/address';
import { PaginatedView } from 'components/paginated-view';
import { Text } from 'components/primitives';
import { useCW20TokenInfoQuery } from 'queries';
import { useProposalVotesQuery } from 'queries/useProposalVotesQuery';
import { useCurrentProposal } from './CurrentProposalProvider';
import styles from './ProposalVotes.module.sass';

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

  return votes.length === 0 ? null : (
    <div className={styles.root}>
      <Text className={styles.title} variant="heading4">
        Votes
      </Text>
      <div className={styles.list}>
        <PaginatedView onRequestToLoadMore={fetchNextPage} isLoading={isLoading || isFetchingNextPage}>
          {votes?.map(({ outcome, amount, voter }, index) => (
            <div className={styles.vote} key={index}>
              <Text variant="heading4">{capitalizeFirstLetter(outcome)}</Text>
              <Address address={voter} />
              <Text variant="text">-</Text>
              {token && <Text variant="text">{`${demicrofy(amount, token.decimals ?? 6)} ${token.symbol}`}</Text>}
            </div>
          ))}
        </PaginatedView>
      </div>
    </div>
  );
};

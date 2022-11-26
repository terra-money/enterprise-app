import { Container } from '@terra-money/apps/components';
import { Text } from 'components/primitives';
import { QUERY_KEY, useProposalsQuery } from 'queries';
import { ProposalCard } from '../shared/ProposalCard';
import styles from './RecentProposals.module.sass';

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
    <Container className={styles.root} direction="column">
      <Text variant="heading4">Recent Proposals</Text>
      {isLoading ? (
        <Container className={styles.list}>
          {[...Array(12)].map((_, index) => {
            return <ProposalCard key={index} />;
          })}
        </Container>
      ) : (
        <Container className={styles.list}>
          {proposals.map((proposal, index) => (
            <ProposalCard key={index} proposal={proposal} />
          ))}
        </Container>
      )}
    </Container>
  );
};

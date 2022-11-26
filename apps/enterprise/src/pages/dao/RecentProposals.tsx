import { Container } from '@terra-money/apps/components';
import { Text } from 'components/primitives';
import { useProposalsQuery } from 'queries';
import { DAO } from 'types';
import { ProposalCard } from '../shared/ProposalCard';
import styles from './RecentProposals.module.sass';

const LIMIT = 6;

interface RecentProposalsProps {
  dao?: DAO;
}

export const RecentProposals = (props: RecentProposalsProps) => {
  const { dao } = props;

  const { data: proposals } = useProposalsQuery({
    daoAddress: dao?.address,
    limit: LIMIT,
    enabled: Boolean(dao?.address),
  });

  if (proposals !== undefined && proposals.length === 0) {
    return null;
  }

  return (
    <Container className={styles.root} direction="column">
      <Text variant="heading4">Recent Proposals</Text>
      {proposals === undefined ? (
        <Container className={styles.list}>
          {[...Array(LIMIT)].map((_, index) => {
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

import { Container } from '@terra-money/apps/components';
import { Text } from 'components/primitives';
import { DAOCard } from 'pages/shared/DAOCard';
import { QUERY_KEY, useDAOsQuery } from 'queries';
import styles from './RecentDAOs.module.sass';

const LIMIT = 6;

export const RecentDAOs = () => {
  const { data: daos = [], isLoading } = useDAOsQuery({
    limit: LIMIT,
    direction: 'desc',
    queryKey: QUERY_KEY.RECENT_DAOS,
  });

  if (isLoading === false && daos.length === 0) {
    return null;
  }

  return (
    <Container className={styles.root} direction="column">
      <Text variant="heading4">Recent DAOs</Text>
      {isLoading ? (
        <Container className={styles.list}>
          {[...Array(LIMIT)].map((_, index) => {
            return <DAOCard key={index} skeleton={true} />;
          })}
        </Container>
      ) : (
        <Container className={styles.list}>
          {daos.map((dao, index) => (
            <DAOCard key={index} dao={dao} skeleton={false} />
          ))}
        </Container>
      )}
    </Container>
  );
};

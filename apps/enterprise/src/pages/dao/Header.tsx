import { Container } from '@terra-money/apps/components';
import classNames from 'classnames';
import { DAOLogo } from 'components/dao-logo';
import { FavouriteToggle } from 'components/favourite-toggle';
import { Text } from 'components/primitives';
import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';
import { forwardRef, Ref } from 'react';
import { useNavigate } from 'react-router';
import { DaoNavigation } from './DaoNavigation';
import styles from './Header.module.sass';

interface HeaderProps {
  className?: string;
  compact?: boolean;
}

export const Header = forwardRef((props: HeaderProps, ref: Ref<HTMLDivElement>) => {
  const dao = useCurrentDao();
  const { className, compact = false } = props;

  const navigate = useNavigate();

  if (compact) {
    return (
      <Container ref={ref} className={classNames(className, styles.root, styles.compact)}>
        <DAOLogo className={styles.logo} logo={dao.logo} />
        <FavouriteToggle className={styles.favourite} dao={dao} />
        <Text className={styles.name} variant="heading2">
          {dao.name}
        </Text>
        <Container className={styles.tabs}>
          <DaoNavigation />
        </Container>
      </Container>
    );
  }

  return (
    <Container className={classNames(className, styles.root)} direction="column">
      <Container className={styles.container}>
        <Text className={styles.back} variant="link" onClick={() => navigate(-1)}>
          Back
        </Text>
        <DAOLogo className={styles.logo} logo={dao.logo} />
        <FavouriteToggle className={styles.favourite} dao={dao} />
        <Text className={styles.name} variant="heading2">
          {dao.name}
        </Text>
      </Container>
      <Container ref={ref} className={styles.tabs}>
        <DaoNavigation />
      </Container>
    </Container>
  );
});

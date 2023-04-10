import { Container } from '@terra-money/apps/components';
import classNames from 'classnames';
import { DAOLogo } from 'components/dao-logo';
import { FavouriteToggle } from 'components/favourite-toggle';
import { Text } from 'components/primitives';
import { Line } from 'lib/ui/Line';
import { VStack } from 'lib/ui/Stack';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { forwardRef, Ref } from 'react';
import { DaoNavigation } from './DaoNavigation';
import styles from './Header.module.sass';
import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { Path } from 'navigation';
import { getDaoLogo } from 'dao/utils/getDaoLogo';
import { toDao } from 'dao/utils/toDao';

interface HeaderProps {
  className?: string;
  compact?: boolean;
}

export const Header = forwardRef((props: HeaderProps, ref: Ref<HTMLDivElement>) => {
  const dao = useCurrentDao();
  const { className, compact = false } = props;

  if (compact) {
    return (
      <Container ref={ref} className={classNames(className, styles.root, styles.compact)}>
        <div className={styles.logo}>
          <DAOLogo size="m" logo={getDaoLogo(dao)} />
        </div>
        <FavouriteToggle className={styles.favourite} dao={toDao(dao)} />
        <Text className={styles.name} variant="heading2">
          {dao.metadata.name}
        </Text>
        <Container className={styles.tabs}>
          <DaoNavigation />
        </Container>
      </Container>
    );
  }

  return (
    <Container className={classNames(className, styles.root)} direction="column">
      <VStack gap={16}>
        <Container className={styles.container}>
          <InternalLink to={Path.Daos}>
            <Text className={styles.back} variant="link">
              Back
            </Text>
          </InternalLink>
          <div className={styles.logo}>
            <DAOLogo size="m" logo={getDaoLogo(dao)} />
          </div>
          <FavouriteToggle className={styles.favourite} dao={toDao(dao)} />
          <Text className={styles.name} variant="heading2">
            {dao.metadata.name}
          </Text>
        </Container>
        {dao.metadata.description && <Text variant="text">{dao.metadata.description}</Text>}
        <Line />
      </VStack>
      <Container ref={ref} className={styles.tabs}>
        <DaoNavigation />
      </Container>
    </Container>
  );
});

import { Stack } from 'lib/ui/Stack';
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
      <Stack direction="row" ref={ref} className={classNames(className, styles.root, styles.compact)}>
        <div className={styles.logo}>
          nbwaro
          <DAOLogo size="m" logo={getDaoLogo(dao)} />
        </div>
        <FavouriteToggle className={styles.favourite} dao={toDao(dao)} />
        <Text className={styles.name} variant="heading2">
          {dao.metadata.name}
        </Text>
        <Stack direction="row" className={styles.tabs}>
          <DaoNavigation />
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack className={classNames(className, styles.root)} direction="column">
      <VStack gap={16}>
        <Stack direction="row" className={styles.container}>
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
        </Stack>
        {dao.metadata.description && <Text variant="text">{dao.metadata.description}</Text>}
        <Line />
      </VStack>
      <Stack direction="row" ref={ref} className={styles.tabs}>
        <DaoNavigation />
      </Stack>
    </Stack>
  );
});

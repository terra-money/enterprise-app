import { Stack } from 'lib/ui/Stack';
import { Text } from 'components/primitives';
import classNames from 'classnames';
import { forwardRef, ReactNode, Ref } from 'react';
import styles from './Header.module.sass';
import { HStack } from 'lib/ui/Stack';

interface HeaderProps {
  className?: string;
  isLoading: boolean;
  totalCount: number;
  searchInput: ReactNode;
  filters: ReactNode;
}

export const Header = forwardRef((props: HeaderProps, ref: Ref<HTMLDivElement>) => {
  const { className, isLoading, totalCount } = props;

  const searchResultsLabel = isLoading ? 'Searching...' : `Displaying ${totalCount} results`;

  return (
    <Stack className={classNames(className, styles.root)} direction="column">
      <Stack className={styles.container} direction="column">
        <Text className={styles.heading} variant="heading2">
          DAOs
        </Text>
        <Text className={styles.subHeading} variant="label">
          Manage your favourite DAOs
        </Text>
        <HStack ref={ref} alignItems="center" gap={40} justifyContent="space-between">
          {props.searchInput}
          {props.filters}
        </HStack>
      </Stack>
      <Text className={styles.results} variant="label">
        {searchResultsLabel}
      </Text>
    </Stack>
  );
});

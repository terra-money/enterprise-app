import { Container } from '@terra-money/apps/components';
import { Text } from 'components/primitives';
import classNames from 'classnames';
import { forwardRef, ReactNode, Ref } from 'react';
import styles from './Header.module.sass';
import { HStack } from 'lib/ui/Stack';

interface HeaderProps {
  className?: string;
  compact?: boolean;
  isLoading: boolean;
  totalCount: number;
  searchInput: ReactNode;
  filters: ReactNode;
}

export const Header = forwardRef((props: HeaderProps, ref: Ref<HTMLDivElement>) => {
  const { className, compact = false, isLoading, totalCount } = props;

  const searchResultsLabel = isLoading ? 'Searching...' : `Displaying ${totalCount} results`;

  if (compact) {
    return (
      <Container ref={ref} className={classNames(className, styles.root, styles.compact)} direction="row">
        {props.searchInput}
        {props.filters}
      </Container>
    );
  }

  return (
    <Container className={classNames(className, styles.root)} direction="column">
      <Container className={styles.container} direction="column">
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
      </Container>
      <Text className={styles.results} variant="label">
        {searchResultsLabel}
      </Text>
    </Container>
  );
});

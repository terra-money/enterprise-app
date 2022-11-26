import { Container } from '@terra-money/apps/components';
import { SearchInput, Text } from 'components/primitives';
import classNames from 'classnames';
import { forwardRef, Ref } from 'react';
import { Action } from 'types';
import styles from './Header.module.sass';

interface HeaderProps {
  className?: string;
  compact?: boolean;
  isLoading: boolean;
  totalCount: number;
  searchText: string;
  onSearchTextChange: Action<string>;
  onSearch: Action<void>;
}

export const Header = forwardRef((props: HeaderProps, ref: Ref<HTMLDivElement>) => {
  const { className, compact = false, isLoading, totalCount, searchText, onSearchTextChange, onSearch } = props;

  const searchResultsLabel = isLoading ? 'Searching...' : `Displaying ${totalCount} results`;

  if (compact) {
    return (
      <Container ref={ref} className={classNames(className, styles.root, styles.compact)} direction="row">
        <SearchInput
          className={styles.searchInput}
          value={searchText}
          onChange={onSearchTextChange}
          onClear={() => {
            onSearchTextChange('');
            onSearch();
          }}
          onSearch={onSearch}
        />
        <Text className={styles.results} variant="label">
          {searchResultsLabel}
        </Text>
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
        <Container ref={ref} direction="column">
          <SearchInput
            className={styles.searchInput}
            value={searchText}
            onChange={onSearchTextChange}
            onClear={() => {
              onSearchTextChange('');
              onSearch();
            }}
            onSearch={onSearch}
          />
        </Container>
      </Container>
      <Text className={styles.results} variant="label">
        {searchResultsLabel}
      </Text>
    </Container>
  );
});

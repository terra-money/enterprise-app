import { Container, ScrollableContainer, StickyHeader } from '@terra-money/apps/components';
import { PageLayout } from 'components/layout';
import { IconButton, SearchInput } from 'components/primitives';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useEffect, useRef, useState } from 'react';
import { Header } from './Header';
import { List } from './List';
import styles from './Page.module.sass';
import { ReactComponent as ErrorIcon } from 'components/assets/Error.svg';
import { enterprise } from 'types/contracts';
import { daoTypes } from 'dao';
import { DaoFilter } from './DaoFilter';
import { useAllDaosQuery } from 'dao/hooks/useAllDaosQuery';

export const Page = () => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [daoTypesToDisplay, setDaoTypesToDisplay] = useState<enterprise.DaoType[]>(daoTypes);

  useEffect(() => {
    if (showDropdown) {
      const handleClick = (event: MouseEvent) => {
        if (!dropdownRef.current || !dropdownRef.current.contains(event.target as Node)) {
          setShowDropdown(false);
        }
      };
      document.addEventListener('mousedown', handleClick);
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }
  }, [showDropdown]);

  const [searchText, setSearchText] = useState('');

  const { data = [], isLoading } = useAllDaosQuery();

  const items = data
    .filter((item) => daoTypesToDisplay.includes(item.type))
    .filter((dao) => dao.name.includes(searchText))
    .sort((a, b) => (b.tvl ?? 0) - (a.tvl ?? 0));

  const searchInput = (
    <SearchInput
      value={searchText}
      onChange={setSearchText}
      onClear={() => {
        setSearchText('');
      }}
    />
  );

  const filters = <DaoFilter value={daoTypesToDisplay} onChange={setDaoTypesToDisplay} />;

  const noResults = (
    <Container className={styles.noResultsContainer}>
      <IconButton className={styles.Icon} onClick={() => setSearchText('')}>
        <ErrorIcon />
      </IconButton>
      <Text className={styles.noResultsLabel}>We couldn’t find any DAOs matching your criteria. Please try again.</Text>
    </Container>
  );

  const content = isLoading || data.length > 0 ? <List items={items} isLoading={isLoading} /> : noResults;

  return (
    <ResponsiveView
      small={() => (
        <VStack gap={24}>
          <Text size={24} weight="bold">
            DAOs
          </Text>
          {searchInput}
          {content}
        </VStack>
      )}
      normal={() => (
        <ScrollableContainer
          stickyRef={stickyRef}
          header={(visible) => (
            <StickyHeader visible={visible}>
              <Header
                compact={true}
                isLoading={isLoading}
                totalCount={items?.length ?? 0}
                searchInput={searchInput}
                filters={filters}
              />
            </StickyHeader>
          )}
        >
          <PageLayout
            header={
              <Header
                ref={stickyRef}
                isLoading={isLoading}
                totalCount={items?.length ?? 0}
                searchInput={searchInput}
                filters={filters}
              />
            }
          >
            {content}
          </PageLayout>
        </ScrollableContainer>
      )}
    />
  );
};

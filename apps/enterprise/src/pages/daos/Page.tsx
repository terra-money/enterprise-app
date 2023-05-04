import { Container, ScrollableContainer, StickyHeader } from '@terra-money/apps/components';
import { PageLayout } from 'components/layout';
import { Navigation } from 'components/Navigation';
import { IconButton, SearchInput } from 'components/primitives';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { QUERY_KEY, useDAOsQuery } from 'queries';
import { useEffect, useRef, useState } from 'react';
import { Header } from './Header';
import { List } from './List';
import styles from './Page.module.sass';
import { ReactComponent as ErrorIcon } from 'components/assets/Error.svg';
import { enterprise } from 'types/contracts';
import { daoTypes } from 'dao';
import { DaoFilter } from './DaoFilter';
import { IndexersAreRequired } from 'settings/components/IndexersAreRequired';
import { useDebounceSearch } from 'hooks/useDebounce';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';

const MAX_PREVIEW_SIZE = 30;

export const Page = () => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [daoTypesToDisplay, setDaoTypesToDisplay] = useState<enterprise.DaoType[]>(daoTypes);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounceSearch(searchText, 500);
  const [daosQueryKey, setDaosQueryKey] = useState<string>(QUERY_KEY.DAOS);
  const [pageLastIndex, setPageLastIndex] = useState<string | null>(null);
  const [allItems, setAllItems] = useState<any[]>([]);
  const [loadMore, setLoadMore] = useState(true);

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


  

  useEffect(() => {
    setDaosQueryKey(debouncedSearchText === '' ? QUERY_KEY.DAOS : `${QUERY_KEY.DAOS}-${debouncedSearchText}`);
  }, [debouncedSearchText]);

  const { data, isLoading } = useDAOsQuery({
    query: debouncedSearchText,
    limit: MAX_PREVIEW_SIZE,
    start_after: pageLastIndex || '',
    queryKey: daosQueryKey,
  });

  useEffect(() => {
    if (data && data.length && loadMore) {
      const items = data.filter(item => daoTypesToDisplay.includes(item.type));
      setPageLastIndex(data[data.length - 1].address);
      setAllItems(prevItems => [...prevItems, ...items]);
    }
  
    
    if (!isLoading && loadMore) {
      setLoadMore(false);
    }
  }, [data, daoTypesToDisplay, loadMore, isLoading]);

  const viewMoreButton = (
    <PrimaryButton
      kind="secondary"
      onClick={() => {
        const newQueryKey = `${daosQueryKey}-${pageLastIndex}`;
        setDaosQueryKey(newQueryKey);
        setLoadMore(true)
      }}
    >
      View More
    </PrimaryButton>
  );

  const searchInput = (
    <SearchInput
      value={searchText}
      onChange={setSearchText}
      onClear={() => {
        setSearchText('')
      }}
    />
  );

  const filters = (
    <DaoFilter
      value={daoTypesToDisplay}
      onChange={setDaoTypesToDisplay}
    />
  )

  const noResults = (
    <Container className={styles.noResultsContainer}>
      <IconButton
        className={styles.Icon}
        onClick={() =>
          setSearchText('')
        }
      >
        <ErrorIcon />
      </IconButton>
      <Text className={styles.noResultsLabel}>
        We couldn’t find DAOs matching your criteria. Please try again.
      </Text>
    </Container>
  )

  return (
    <Navigation>
      <ResponsiveView
        small={() => (
          <VStack gap={24}>
            <Text size={24} weight="bold">
              DAOs
            </Text>
            <IndexersAreRequired>
              {searchInput}
              {allItems && allItems.length ? (
                <>
                  <List items={allItems} isLoading={isLoading} />
                  {viewMoreButton}
                </>
              ) : (
                noResults
              )}
            </IndexersAreRequired>
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
                  totalCount={allItems?.length ?? 0}
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
                  totalCount={allItems?.length ?? 0}
                  searchInput={searchInput}
                  filters={filters}
                />
              }
            >
              <IndexersAreRequired>
              {allItems && allItems.length ? (
                <>
                  <List items={allItems} isLoading={isLoading} />
                  {viewMoreButton}
                </>
              ) : (
                noResults
              )}
              </IndexersAreRequired>
            </PageLayout>
          </ScrollableContainer>
        )}
      />
    </Navigation>
  );
};

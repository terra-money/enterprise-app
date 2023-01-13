import { Container, ScrollableContainer, StickyHeader } from '@terra-money/apps/components';
import { PageLayout } from 'components/layout';
import { Navigation } from 'components/Navigation';
import { Button, IconButton, SearchInput } from 'components/primitives';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useDAOsQuery } from 'queries';
import { useMemo, useRef, useState } from 'react';
import { Header } from './Header';
import { List } from './List';
import styles from './Page.module.sass';
import { ReactComponent as ErrorIcon } from 'components/assets/Error.svg';

const MAX_PREVIEW_SIZE = 30;

export const Page = () => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  // let [items, setItems] = useState<DAO[]>([]);


  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const daoFilters = [
    { label: 'Multisig', value: 'multisig' },
    { label: 'Token', value: 'token' },
    { label: 'NFT', value: 'nft' }
  ]
  const [search, setSearch] = useState({
    input: '',
    searchText: '',
  });

  const { data, isLoading } = useDAOsQuery({
    query: search.searchText,
    limit: MAX_PREVIEW_SIZE,
  });

  const filteredItems = useMemo(() => {
    if (!selectedFilter) {
      return data;
    }
    return data?.filter(item => item.type === selectedFilter)
  }, [data, selectedFilter])


  const handleFilterChange = (event: any) => {
    if (event.target.value === selectedFilter) {
      setSelectedFilter('')
    } else {
      setSelectedFilter(event.target.value)
    }
  };

  const searchInput = (
    <SearchInput
      value={search.input}
      onChange={(input) =>
        setSearch((previous) => {
          return {
            ...previous,
            input,
          };
        })
      }
      onClear={() => {
        setSearch((previous) => {
          return {
            ...previous,
            input: '',
            searchText: '',
          };
        });
      }}
      onSearch={() =>
        setSearch((previous) => {
          return {
            ...previous,
            searchText: previous.input,
          };
        })
      }
    />
  );

  return (
    <Navigation>
      <ResponsiveView
        small={() => (
          <VStack gap={24}>
            <Text size={24} weight="bold">
              DAOs
            </Text>
            {searchInput}

            {data && data.length ? (
              <List items={filteredItems} isLoading={isLoading} />
            ) : (
              <Container className={styles.noResultsContainer}>
                <IconButton className={styles.Icon} onClick={() => setSearch({
                  input: '',
                  searchText: '',
                })}><ErrorIcon /></IconButton>
                <Text className={styles.noResultsLabel}>We couldn’t find DAOs matching your criteria. Please try again.</Text>
              </Container>
            )}
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
                  totalCount={filteredItems?.length ?? 0}
                  searchInput={searchInput}
                />
              </StickyHeader>
            )}
          >
            <PageLayout
              header={
                <>
                  <Header
                    ref={stickyRef}
                    isLoading={isLoading}
                    totalCount={filteredItems?.length ?? 0}
                    searchInput={searchInput}
                  />
                  <Container>
                    <Button className={styles.filterButton} onClick={handleToggleDropdown}>Add Filters</Button>
                    {showDropdown && (
                      <Container className={styles.filterContainer} direction="column">
                        {daoFilters.map(filter => (
                          <div key={filter.value} className={styles.filterOption}>
                            <input
                              type="radio"
                              name="filter"
                              value={filter.value}
                              checked={filter.value === selectedFilter}
                              onChange={handleFilterChange}
                            />
                            <label>{filter.label}</label>
                            <IconButton className={styles.filterIcon} onClick={() => setSelectedFilter('')}><ErrorIcon /></IconButton>
                          </div>

                        ))}
                      </Container>
                    )}
                  </Container>
                </>
              }
            >{data && data.length ? (
              <List items={filteredItems} isLoading={isLoading} />
            ) : (
              <Container className={styles.noResultsContainer}>
                <IconButton className={styles.Icon} onClick={() => setSearch({
                  input: '',
                  searchText: '',
                })}><ErrorIcon /></IconButton>
                <Text className={styles.noResultsLabel}>We couldn’t find DAOs matching your criteria. Please try again.</Text>
              </Container>
            )}
            </PageLayout>
          </ScrollableContainer>
        )}
      />
    </Navigation>
  );
};

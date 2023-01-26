import { Container, ScrollableContainer, StickyHeader } from '@terra-money/apps/components';
import { PageLayout } from 'components/layout';
import { Navigation } from 'components/Navigation';
import { Button, Divider, IconButton, SearchInput } from 'components/primitives';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useDAOsQuery } from 'queries';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Header } from './Header';
import { List } from './List';
import styles from './Page.module.sass';
import { ReactComponent as ErrorIcon } from 'components/assets/Error.svg';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';

const MAX_PREVIEW_SIZE = 30;

export const Page = () => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('');


  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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

  const filters = (
    <>
      <PrimaryButton
        className={styles.filterButton}
        as="div"
        kind="secondary"
        onClick={() => {
          handleToggleDropdown();
        }}
      >
        <ResponsiveView small={() => 'Filter'} normal={() => 'Filter'} />
      </PrimaryButton>
      <Container ref={dropdownRef}>
        {showDropdown && (
          <div ref={dropdownRef}>
            <Container className={styles.filterContainer} direction="column">
              <Text className={styles.filterLabel}>DAO Type</Text>
              <Container direction='column' gap={10}>
                {daoFilters.map((filter) => (
                  <div key={filter.value} className={styles.filterOption}>
                    <Container direction="row" gap={10}>
                      <input
                        type="radio"
                        name="filter"
                        value={filter.value}
                        checked={filter.value === selectedFilter}
                        onChange={handleFilterChange}
                      />
                      <label>{filter.label}</label>
                    </Container>
                  </div>
                ))}
              </Container>
              <Divider></Divider>
              <Text className={styles.resetButton} onClick={() => setSelectedFilter('')}>Reset all filters</Text>
            </Container>
          </div>
        )}
      </Container>
    </>
  )

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
            {data && data?.length ? (
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
                  totalCount={filteredItems?.length ?? 0}
                  searchInput={searchInput}
                  filters={filters}
                />
              }
            >{data && data?.length ? (
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

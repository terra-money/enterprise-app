import { Container, ScrollableContainer, StickyHeader } from '@terra-money/apps/components';
import { PageLayout } from 'components/layout';
import { Navigation } from 'components/Navigation';
import { IconButton, SearchInput } from 'components/primitives';
import { usePreviousIfEmpty } from 'hooks';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useDAOsQuery } from 'queries';
import { useRef, useState } from 'react';
import { DAO } from 'types';
import { Header } from './Header';
import { List } from './List';
import styles from './Page.module.sass';
import { ReactComponent as ErrorIcon } from 'components/assets/Error.svg';

const MAX_PREVIEW_SIZE = 30;

export const Page = () => {
  const stickyRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState({
    input: '',
    searchText: '',
  });

  const { data, isLoading } = useDAOsQuery({
    query: search.searchText,
    limit: MAX_PREVIEW_SIZE,
  });

  const items = usePreviousIfEmpty([...Array<DAO>(MAX_PREVIEW_SIZE)], data);

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
            {items && items.length ? (
              <List items={items} isLoading={isLoading} />
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
                  totalCount={items?.length ?? 0}
                  searchInput={searchInput}
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
                />
              }
            >{items && items.length ? (
              <List items={items} isLoading={isLoading} />
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

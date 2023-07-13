import { Container } from '@terra-money/apps/components';
import { IconButton } from 'components/primitives';
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
import { SearchInput } from 'lib/ui/inputs/SearchInput';
import { PageLayout } from 'components/PageLayout';
import { StickyWalletManager } from 'chain/components/StickyWalletManager';

export const Page = () => {
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
    .filter((dao) => dao.name.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) => (b.tvl ?? 0) - (a.tvl ?? 0));

  const searchInput = (
    <SearchInput
      value={searchText}
      style={{ maxWidth: 400 }}
      onValueChange={setSearchText}
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

  const content = isLoading || data.length > 0 ? <List items={items} /> : noResults;

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
        <PageLayout>
          <Header isLoading={isLoading} totalCount={items?.length ?? 0} searchInput={searchInput} filters={filters} />
          <StickyWalletManager />
          {content}
        </PageLayout>
      )}
    />
  );
};

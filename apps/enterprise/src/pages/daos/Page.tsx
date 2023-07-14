import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useEffect, useRef, useState } from 'react';
import { Header } from './Header';
import { enterprise } from 'types/contracts';
import { daoTypes } from 'dao';
import { DaoFilter } from './DaoFilter';
import { useAllDaosQuery } from 'dao/hooks/useAllDaosQuery';
import { SearchInput } from 'lib/ui/inputs/SearchInput';
import { PageLayout } from 'components/PageLayout';
import { StickyWalletManager } from 'chain/components/StickyWalletManager';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { DAOCard } from 'pages/shared/DAOCard';

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
      onValueChange={setSearchText}
      onClear={() => {
        setSearchText('');
      }}
    />
  );

  const filters = <DaoFilter value={daoTypesToDisplay} onChange={setDaoTypesToDisplay} />;

  const content = (
    <SameWidthChildrenRow gap={16} maxColumns={3} fullWidth minChildrenWidth={320}>
      {items?.map((dao, index) => (
        <DAOCard key={index} dao={dao} />
      ))}
    </SameWidthChildrenRow>
  );

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

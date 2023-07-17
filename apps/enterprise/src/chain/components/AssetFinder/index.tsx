import { Asset, AssetInfo } from 'chain/Asset';
import { useAssetInfoQuery } from 'chain/queries/useAssetInfoQuery';
import { useAssetsInfoQuery } from 'chain/queries/useAssetsInfoQuery';
import { isValidAddress } from 'chain/utils/validators';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { removeUndefinedItems } from 'lib/shared/utils/removeUndefinedItems';
import { Spinner } from 'lib/ui/Spinner';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { SearchInput } from 'lib/ui/inputs/SearchInput';
import { useState } from 'react';
import { AssetItem } from './AssetItem';

export interface AssetFinderProps {
  onSelect: (asset: Asset & AssetInfo) => void;
}

export const AssetFinder = ({ onSelect }: AssetFinderProps) => {
  const [searchText, setSearchText] = useState('');

  const isSearchingForCW20 = isValidAddress(searchText);

  const { data: cw20Asset, status: cw20AssetStatus } = useAssetInfoQuery(
    {
      type: 'cw20',
      id: searchText,
    },
    {
      enabled: isSearchingForCW20,
    }
  );

  const { data: assets, status: assetsStatus } = useAssetsInfoQuery();

  return (
    <VStack gap={24}>
      <SearchInput
        style={{ width: '100%' }}
        placeholder="Search for an asset"
        value={searchText}
        onValueChange={setSearchText}
      />
      <VStack>
        <QueryDependant
          status={assetsStatus}
          data={assets}
          error={() => <Text>Failed to load assets</Text>}
          loading={() => <Spinner />}
          success={(assets) => {
            if (isSearchingForCW20) {
              return (
                <QueryDependant
                  data={cw20Asset}
                  status={cw20AssetStatus}
                  error={() => <Text>Failed to find cw20</Text>}
                  loading={() => (
                    <Text>
                      <Spinner style={{ marginRight: 8 }} />
                      Searching for cw20
                    </Text>
                  )}
                  success={(asset) => <AssetItem key={asset.id} asset={asset} onSelect={() => onSelect(asset)} />}
                />
              );
            }

            let items = Object.values(assets);
            if (searchText) {
              items = items.filter((asset) => {
                const keys = removeUndefinedItems([asset.id, asset.name, asset.symbol]);

                return keys.some((key) => key.toLowerCase().includes(searchText.toLowerCase()));
              });
            }

            return items.map((asset) => <AssetItem key={asset.id} asset={asset} onSelect={() => onSelect(asset)} />);
          }}
        />
      </VStack>
    </VStack>
  );
};

import { sum } from 'lib/shared/utils/sum';
import styled from 'styled-components';
import { AssetCard } from '../AssetCard';
import { Modal } from 'lib/ui/Modal';
import { useState } from 'react';
import { ClosableComponentProps } from 'lib/shared/props';
import { Container, ScrollableContainer } from '@terra-money/apps/components';
import { SearchInput } from 'components/primitives';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import styles from './ViewMoreAssets.module.sass'
import { Text } from 'components/primitives';
import { useDaoAssets } from 'queries/useDaoAssets';
import { getAssetBalanceInUsd } from 'chain/Asset';
import { Token } from 'types';
import { u } from '@terra-money/apps/types';
import { BigSource } from 'big.js';

export type TreasuryToken = Token & { amount: u<BigSource>; usdAmount?: BigSource };

const AssetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(386.67px, 1fr));
  grid-template-rows: repeat(auto-fill, 104px);
  gap: 16px;
  width: 100%;
  flex:1
`;

export const ViewMoreAssetsOverlay = ({ onClose }: ClosableComponentProps) => {
  const [search, setSearch] = useState({
    input: '',
    searchText: '',
  });


  const { data: assets = [] } = useDaoAssets();
  const assetCount = assets?.length;
  const renderAssets = () => {
    const treasuryTotalInUSD = sum(assets.map(getAssetBalanceInUsd));
    const sortedAssets = assets.filter(asset => 
      asset.name.toLowerCase().includes(search.searchText.toLowerCase())).sort((a, b) => getAssetBalanceInUsd(b) - getAssetBalanceInUsd(a));
    return (
      <AssetsContainer>
        {sortedAssets.map((asset, index) => {
          return <AssetCard key={index} token={asset} treasuryTotalInUSD={treasuryTotalInUSD} />;
        })}
      </AssetsContainer>
    );
  };

  return (
    <Modal
      width={970}
      className={styles.viewMoreAssetsModal}
      title="Assets Treasury"
      onClose={onClose}
      renderContent={() => {
        return (
          <Container className={styles.modalContent} gap={32}>
            <Text variant='label' className={styles.count}> Displaying {assetCount} Assets in treasury</Text>
            <SearchInput
              className={styles.searchInput}
              value={search.input}
              onChange={(input) =>
                setSearch((previous) => {
                  return {
                    ...previous,
                    input,
                  };
                })
              }
              onClear={() =>
                setSearch({
                  input: '',
                  searchText: '',
                })
              }
              onSearch={() =>
                setSearch((previous) => {
                  return {
                    ...previous,
                    searchText: previous.input,
                  };
                })
              }
            />
            <ScrollableContainer>
              <AssetsContainer>
                {renderAssets()}
              </AssetsContainer>
            </ScrollableContainer>
            <PrimaryButton kind="secondary" onClick={onClose} className={styles.closeButton}>
              Close
            </PrimaryButton>
          </Container>

        );
      }}
    />
  );
};
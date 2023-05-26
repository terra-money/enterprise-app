import { useDAOAssetWhitelist, useTreasuryTokensQuery } from 'queries';
import Big from 'big.js';
import { assertDefined, sum } from '@terra-money/apps/utils';
import styled from 'styled-components';
import { useCurrentDaoAddress } from 'dao/navigation';
import { AssetCard } from '../AssetCard';
import { Modal } from 'lib/ui/Modal';
import { useState } from 'react';
import { ClosableComponentProps } from 'lib/shared/props';
import { Container } from '@terra-money/apps/components';
import { SearchInput } from 'components/primitives';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import styles from './ViewMoreAssets.module.sass'
import { Text } from 'components/primitives';



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
  const address = useCurrentDaoAddress()
  const assetWhitelist = useDAOAssetWhitelist(address);
  
  const { data: tokenBalances } = useTreasuryTokensQuery(address);

  const tokenBalancesWithPrice = tokenBalances
    ? tokenBalances
      .filter((t) => t.usdAmount)
      .sort((a, b) => assertDefined(b.usdAmount).cmp(assertDefined(a.usdAmount)))
    : undefined;

  const treasuryTotalInUSD = tokenBalancesWithPrice
    ? sum(tokenBalancesWithPrice.map((token) => assertDefined(token.usdAmount)))
    : undefined;

  const tokenBalancesWithoutPrice = tokenBalances
    ? tokenBalances.filter((token) => token.usdAmount === undefined).sort((a, b) => Big(a.amount).cmp(b.amount))
    : undefined;

  const assetCount = tokenBalances?.length;

  return (
    <Modal
    width={970}
    className={styles.viewMoreAssetsModal}
      title="Assets Treasury"
      onClose={onClose}
      renderContent={() => {
        return (
          <Container className={styles.modalContent} gap={32}>
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
            <Text variant='label' className={styles.count}> Displaying {assetCount} Assets in treasury</Text>
            <AssetsContainer>
              {treasuryTotalInUSD !== undefined &&
                tokenBalancesWithPrice?.map((token, index) => (
                  <AssetCard token={token} treasuryTotalInUSD={treasuryTotalInUSD}></AssetCard>
                ))}
              {tokenBalancesWithoutPrice !== undefined &&
                tokenBalancesWithoutPrice?.map((token, index) => (
                  <AssetCard token={token}></AssetCard>
                ))}
            </AssetsContainer>
            <PrimaryButton kind="secondary" onClick={onClose} className={styles.closeButton}>
              Close
            </PrimaryButton>
          </Container>

        );
      }}
    />
  );
};
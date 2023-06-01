import { Token } from 'types';
import { u } from '@terra-money/apps/types';
import { BigSource } from 'big.js';
import { Address } from 'components/address';
import styled from 'styled-components';
import { VStack } from 'lib/ui/Stack';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { DepositIntoTreasury } from './deposit';
import { useCurrentDaoAddress } from 'dao/navigation';
import { AssetCard } from './AssetCard';
import { DaoTVL } from './DaoTVL';
import { useDaoAssets } from 'queries/useDaoAssets';
import { sum } from 'lib/shared/utils/sum';
import { getAssetBalanceInUsd } from 'chain/Asset';

export type TreasuryToken = Token & { amount: u<BigSource>; usdAmount?: BigSource };

const AssetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(386.67px, 1fr));
  grid-template-rows: repeat(auto-fill, 104px);
  gap: 16px;
`;

const BasicInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 16px;
  border-radius: 12px;
  background-color: #1d1f20;
  width: 100%;
  height: 64px;
  padding-left: 16px;
  margin-bottom: 10px;
`;

const NormalScreenWidthContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 48px;
`;

const SmallScreenWidthContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 88px;
  grid-template-rows: minmax(88px, 1fr);
  gap: 12px;
`;

export const TreasuryTokensOverview = () => {
  const address = useCurrentDaoAddress();

  const { data: assets = [] } = useDaoAssets();

  const renderBasicInfo = () => {
    return (
      <BasicInfoContainer>
        <DaoTVL />
        <Address address={address} />
      </BasicInfoContainer>
    );
  };

  const renderAssets = () => {
    const treasuryTotalInUSD = sum(assets.map(getAssetBalanceInUsd))

    const sortedAssets = assets.sort((a, b) => getAssetBalanceInUsd(b) - getAssetBalanceInUsd(a))

    return (
      <AssetsContainer>
        {sortedAssets.map((asset, index) => (
          <AssetCard key={index} token={asset} treasuryTotalInUSD={treasuryTotalInUSD}></AssetCard>
        ))}
      </AssetsContainer>
    );
  };

  return (
    <ResponsiveView
      small={() => (
        <VStack gap={12}>
          <SmallScreenWidthContainer>{renderBasicInfo()}</SmallScreenWidthContainer>
          {renderAssets()}
          <DepositIntoTreasury />
        </VStack>
      )}
      normal={() => (
        <NormalScreenWidthContainer>
          <VStack fullHeight fullWidth justifyContent="space-between" gap={8}>
            {renderBasicInfo()}
            {renderAssets()}
            <DepositIntoTreasury />
          </VStack>
        </NormalScreenWidthContainer>
      )}
    />
  );
};

import { useTreasuryTokensQuery } from 'queries';
import { Token } from 'types';
import { u } from '@terra-money/apps/types';
import Big, { BigSource } from 'big.js';
import { assertDefined, sum } from '@terra-money/apps/utils';
import { Throbber } from 'components/primitives';
import { AnimateNumber } from '@terra-money/apps/components';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import { Address } from 'components/address';
import styled from 'styled-components';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { DepositIntoTreasury } from './deposit';
import { useCurrentDaoAddress } from 'dao/navigation';
import { AssetCard } from './AssetCard';

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
  background-color: #1D1F20;
  width: 100%;
  height: 64px;
  padding-left: 16px;
  margin-bottom: 10px;
`

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
  const address = useCurrentDaoAddress()

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

  // const renderPieChart = () => {
  //   return (
  //     <PieChartWr>
  //       <TreasuryTokensPieChart tokens={tokenBalancesWithPrice || []} />
  //     </PieChartWr>
  //   );
  // };

  const renderBasicInfo = () => {
    return (
      <BasicInfoContainer>
        <Text color="supporting" size={14}>
          Treasury Total Value:
        </Text>
        {treasuryTotalInUSD !== undefined ? (
          <Text size={18} weight="semibold">
            <AnimateNumber format={(v) => formatAmount(v)}>{treasuryTotalInUSD ?? 0}</AnimateNumber>
          </Text>
        ) : (
          <Throbber variant="secondary" size="small" />
        )}
        <Address address={address} />
      </BasicInfoContainer>

    );
  };

  const renderAssets = () => {
    return (
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
    );
  };

  return (
    <ResponsiveView
      small={() => (
        <VStack gap={12}>
          <SmallScreenWidthContainer>
            {renderBasicInfo()}
          </SmallScreenWidthContainer>
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

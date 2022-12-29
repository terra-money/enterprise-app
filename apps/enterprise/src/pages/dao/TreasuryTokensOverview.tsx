import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useTreasuryTokensQuery } from 'queries';
import { Token } from 'types';
import { u } from '@terra-money/apps/types';
import Big, { BigSource } from 'big.js';
import { assertDefined, sum, toPercents } from '@terra-money/apps/utils';
import { Throbber } from 'components/primitives';
import { AnimateNumber } from '@terra-money/apps/components';
import { demicrofy, formatAmount } from '@terra-money/apps/libs/formatting';
import { Address } from 'components/address';
import { TreasuryTokensPieChart } from './TreasuryTokensPieChart';
import styled from 'styled-components';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { ResponsiveView } from 'lib/ui/ResponsiveView';

export type TreasuryToken = Token & { amount: u<BigSource>; usdAmount?: BigSource };

const PieChartWr = styled.div`
  width: 100%;
`;

const AssetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 160px);
`;

const NormalScreenWidthContainer = styled.div`
  display: grid;
  grid-template-columns: 148px 1fr;
  grid-template-rows: minmax(148px, 1fr);
  gap: 48px;
`;

const SmallScreenWidthContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 88px;
  grid-template-rows: minmax(88px, 1fr);
  gap: 12px;
`;

export const TreasuryTokensOverview = () => {
  const dao = useCurrentDao();

  const { data: tokenBalances } = useTreasuryTokensQuery(dao.address);

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

  const renderPieChart = () => {
    return (
      <PieChartWr>
        <TreasuryTokensPieChart tokens={tokenBalancesWithPrice || []} />
      </PieChartWr>
    );
  };

  const renderBasicInfo = () => {
    return (
      <VStack gap={8}>
        <Text color="supporting" size={14}>
          Treasury Total Value
        </Text>
        {treasuryTotalInUSD !== undefined ? (
          <Text size={18} weight="semibold">
            <AnimateNumber format={(v) => formatAmount(v)}>{treasuryTotalInUSD ?? 0}</AnimateNumber>
          </Text>
        ) : (
          <Throbber variant="secondary" size="small" />
        )}
        <Address address={dao.address} />
      </VStack>
    );
  };

  const renderAssets = () => {
    return (
      <AssetsContainer>
        {treasuryTotalInUSD !== undefined &&
          tokenBalancesWithPrice?.map((token, index) => (
            <Text color="supporting" size={14} key={index}>
              {token.symbol} {formatAmount(demicrofy(token.amount, token.decimals))}{' '}
              {toPercents(assertDefined(token.usdAmount).div(treasuryTotalInUSD).toNumber(), 'round')}
            </Text>
          ))}
        {tokenBalancesWithoutPrice !== undefined &&
          tokenBalancesWithoutPrice?.map((token, index) => (
            <Text color="supporting" size={14} key={index}>
              {token.symbol} {formatAmount(demicrofy(token.amount, token.decimals))}
            </Text>
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
            {renderPieChart()}
          </SmallScreenWidthContainer>
          {renderAssets()}
        </VStack>
      )}
      normal={() => (
        <NormalScreenWidthContainer>
          {renderPieChart()}

          <VStack fullHeight justifyContent="space-between" gap={8}>
            <>
              {renderBasicInfo()}
              {renderAssets()}
            </>
          </VStack>
        </NormalScreenWidthContainer>
      )}
    />
  );
};

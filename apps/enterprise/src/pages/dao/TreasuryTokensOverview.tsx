import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';
import { useTreasuryTokensQuery } from 'queries';
import styles from './TreasuryTokensOverview.module.sass';
import { Chart } from 'react-chartjs-2';
import { Token } from 'types';
import { u } from '@terra-money/apps/types';
import Big, { BigSource } from 'big.js';
import { assertDefined, sum, toPercents } from '@terra-money/apps/utils';
import { Text, Throbber } from 'components/primitives';
import { AnimateNumber } from '@terra-money/apps/components';
import { demicrofy, formatAmount } from '@terra-money/apps/libs/formatting';
import { Address } from 'components/address';

type TreasuryToken = Token & { amount: u<BigSource>; usdAmount?: BigSource };

const pieChartColors = ['#E9FF92', '#FFD0B5', '#B4D6FF', '#DCE4EA'];
const getPieChartDataset = (tokens: TreasuryToken[]) => {
  return {
    data: tokens.map((t) => Big(assertDefined(t.usdAmount)).toNumber()),
    backgroundColor: tokens.map((_, index) => pieChartColors[index % pieChartColors.length]),
  };
};

const placeholderDataset = {
  data: [100],
  backgroundColor: ['#252728'],
};

export const TreasuryTokensOverview = () => {
  const dao = useCurrentDao();

  const { data: tokenBalances } = useTreasuryTokensQuery(dao.address);

  const tokenBalancesWithPrice = tokenBalances
    ? tokenBalances
        .filter((t) => t.usdAmount)
        .sort((a, b) => assertDefined(b.usdAmount).cmp(assertDefined(a.usdAmount)))
    : undefined;

  const hasBalance = tokenBalancesWithPrice && tokenBalancesWithPrice.length > 0;

  const treasuryTotalInUSD = tokenBalancesWithPrice
    ? sum(tokenBalancesWithPrice.map((token) => assertDefined(token.usdAmount)))
    : undefined;

  const tokenBalancesWithoutPrice = tokenBalances
    ? tokenBalances.filter((token) => token.usdAmount === undefined).sort((a, b) => Big(a.amount).cmp(b.amount))
    : undefined;

  return (
    <div className={styles.root}>
      <div className={styles.chart}>
        <Chart
          type="doughnut"
          data={{
            datasets: [hasBalance ? getPieChartDataset(tokenBalancesWithPrice) : placeholderDataset],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            elements: {
              point: {
                radius: 0,
              },
              arc: {
                borderWidth: 0,
              },
            },
            scales: {
              x: {
                display: false,
              },
              y: {
                display: false,
              },
            },
          }}
        />
      </div>

      <div className={styles.details}>
        <div className={styles.header}>
          <Text variant="text">Treasury Total Value</Text>
          <Text className={styles.total} variant="heading4">
            {treasuryTotalInUSD !== undefined ? (
              <>
                <AnimateNumber format={(v) => `${formatAmount(v)} USD`}>{treasuryTotalInUSD}</AnimateNumber>
              </>
            ) : (
              <Throbber variant="secondary" size="small" />
            )}
          </Text>
          <Address address={dao.address} />
        </div>
        <div className={styles.assets}>
          {treasuryTotalInUSD !== undefined &&
            tokenBalancesWithPrice?.map((token, index) => (
              <Text variant="text" key={index}>
                {token.symbol} {formatAmount(demicrofy(token.amount, token.decimals))}{' '}
                {toPercents(assertDefined(token.usdAmount).div(treasuryTotalInUSD).toNumber(), 'round')}
              </Text>
            ))}
          {tokenBalancesWithoutPrice !== undefined &&
            tokenBalancesWithoutPrice?.map((token, index) => (
              <Text variant="text" key={index}>
                {token.symbol} {formatAmount(demicrofy(token.amount, token.decimals))}
              </Text>
            ))}
        </div>
      </div>
    </div>
  );
};

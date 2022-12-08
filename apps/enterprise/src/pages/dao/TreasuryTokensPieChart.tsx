import { Chart } from 'react-chartjs-2';
import { TreasuryToken } from './TreasuryTokensOverview';
import Big from 'big.js';
import { assertDefined } from '@terra-money/apps/utils';

interface Props {
  tokens: TreasuryToken[];
}

const placeholderDataset = {
  data: [100],
  backgroundColor: ['#252728'],
};

const pieChartColors = ['#E9FF92', '#FFD0B5', '#B4D6FF', '#DCE4EA'];
const getPieChartDataset = (tokens: TreasuryToken[]) => {
  return {
    data: tokens.map((t) => Big(assertDefined(t.usdAmount)).toNumber()),
    backgroundColor: tokens.map((_, index) => pieChartColors[index % pieChartColors.length]),
  };
};

export const TreasuryTokensPieChart = ({ tokens }: Props) => {
  return (
    <Chart
      type="doughnut"
      data={{
        datasets: [tokens.length > 0 ? getPieChartDataset(tokens) : placeholderDataset],
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
  );
};

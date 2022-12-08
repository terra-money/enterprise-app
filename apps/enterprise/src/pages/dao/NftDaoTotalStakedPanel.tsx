import Big from 'big.js';
import { u } from '@terra-money/apps/types';
import { NumericPanel } from 'components/numeric-panel';
import { formatAmount } from '@terra-money/apps/libs/formatting';

export const NftDaoTotalStakedPanel = () => {
  const totalStaked = Big(0) as u<Big>;
  const isLoadingTotalStaked = false;

  return (
    <NumericPanel
      title="Total staked"
      value={totalStaked}
      isLoading={isLoadingTotalStaked}
      formatter={(v) =>
        formatAmount(v, {
          decimals: 0,
        })
      }
    />
  );
};

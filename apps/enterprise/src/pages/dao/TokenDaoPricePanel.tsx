import { usePrice } from '@terra-money/apps/hooks';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import { NumericPanel } from 'components/numeric-panel';
import { useCurrentDaoAddress } from 'dao/navigation';

export const TokenDaoPricePanel = () => {
  const address = useCurrentDaoAddress();

  const price = usePrice(address);
  if (!price) return null;

  return (
    <NumericPanel
      title="Token Price"
      value={price}
      formatter={(v) =>
        formatAmount(v, {
          decimals: 2,
        })
      }
      suffix="USD"
    />
  );
};

import { usePrice } from '@terra-money/apps/hooks';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { NumericPanel } from 'components/numeric-panel';
import { useCurrentDaoAddress } from 'dao/navigation';
import Big from 'big.js';

export const TokenDaoPricePanel = () => {
  const address = useCurrentDaoAddress();

  const price = usePrice(address);
  if (!price) return null;

  return (
    <NumericPanel
      title="Token Price"
      value={price}
      formatter={(v) =>
        formatAmount(Big(v).toNumber(), {
          decimals: 2,
        })
      }
      suffix="USD"
    />
  );
};

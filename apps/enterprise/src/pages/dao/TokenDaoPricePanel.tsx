import { usePrice } from '@terra-money/apps/hooks';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import { NumericPanel } from 'components/numeric-panel';
import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';

export const TokenDaoPricePanel = () => {
  const dao = useCurrentDao();

  const price = usePrice(dao.membershipContractAddress);
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

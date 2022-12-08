import { formatAmount } from '@terra-money/apps/libs/formatting';
import Big from 'big.js';
import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';
import { useCW721NumTokensQuery } from 'queries/useCW721NumTokensQuery';
import { NumericPanel } from 'components/numeric-panel';

export const NftDaoTotalSupplyPanel = () => {
  const dao = useCurrentDao();

  const { data: numTokens = Big(0), isLoading: isLoadingNumTokens } = useCW721NumTokensQuery(
    dao.membershipContractAddress
  );

  return (
    <NumericPanel
      title="Total supply"
      value={numTokens}
      isLoading={isLoadingNumTokens}
      formatter={(v) =>
        formatAmount(v, {
          decimals: 0,
        })
      }
    />
  );
};

import { AnimateNumber } from '@terra-money/apps/components';
import { NumericPanel } from 'components/numeric-panel';
import { useCW20TokenInfoQuery, useTokenStakingAmountQuery } from 'queries';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import Big from 'big.js';

import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

export const TokenDaoTotalStakedPanel = () => {
  const { address, dao_membership_contract } = useCurrentDao();

  const { data: token } = useCW20TokenInfoQuery(dao_membership_contract);

  const { data: totalStaked = Big(0) as Big, isLoading: isLoadingTotalStaked } = useTokenStakingAmountQuery(address);

  const totalStakedPercent =
    token === undefined || Big(token.total_supply ?? 0).eq(0)
      ? Big(0)
      : totalStaked.div(token.total_supply ?? 0).mul(100);

  return (
    <NumericPanel
      isLoading={isLoadingTotalStaked}
      title="Total staked"
      value={fromChainAmount(totalStaked.toString(), token?.decimals ?? 6)}
      decimals={2}
      suffix={
        <AnimateNumber format={(v) => `${formatAmount(Big(v).toNumber(), { decimals: 1 })}%`}>
          {totalStakedPercent}
        </AnimateNumber>
      }
    />
  );
};

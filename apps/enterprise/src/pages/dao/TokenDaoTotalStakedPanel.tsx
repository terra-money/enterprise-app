import { AnimateNumber } from '@terra-money/apps/components';
import { NumericPanel } from 'components/numeric-panel';
import { useCW20TokenInfoQuery, useTokenStakingAmountQuery } from 'queries';
import { demicrofy, formatAmount } from '@terra-money/apps/libs/formatting';
import Big from 'big.js';
import { u } from '@terra-money/apps/types';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

export const TokenDaoTotalStakedPanel = () => {
  const { address, dao_membership_contract } = useCurrentDao();

  const { data: token } = useCW20TokenInfoQuery(dao_membership_contract);

  const { data: totalStaked = Big(0) as u<Big>, isLoading: isLoadingTotalStaked } = useTokenStakingAmountQuery(address);

  const totalStakedPercent =
    token === undefined || Big(token.total_supply ?? 0).eq(0)
      ? Big(0)
      : totalStaked.div(token.total_supply ?? 0).mul(100);

  return (
    <NumericPanel
      isLoading={isLoadingTotalStaked}
      title="Total staked"
      value={demicrofy(totalStaked, token?.decimals ?? 6)}
      decimals={2}
      suffix={
        <AnimateNumber format={(v) => `${formatAmount(v, { decimals: 1 })}%`}>{totalStakedPercent}</AnimateNumber>
      }
    />
  );
};

import { NumericPanel } from 'components/numeric-panel';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import { AnimateNumber } from '@terra-money/apps/components';
import { useNftDaoStakingInfo } from 'dao/hooks/useNftDaoStakingInfo';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

export const NftDaoTotalStakedPanel = () => {
  const { address, dao_membership_contract } = useCurrentDao();
  const { totalStaked, totalStakedPercent } = useNftDaoStakingInfo(address, dao_membership_contract);

  return (
    <NumericPanel
      title="Total staked"
      value={totalStaked}
      decimals={2}
      suffix={
        <AnimateNumber format={(v) => `${formatAmount(v, { decimals: 1 })}%`}>{totalStakedPercent}</AnimateNumber>
      }
    />
  );
};

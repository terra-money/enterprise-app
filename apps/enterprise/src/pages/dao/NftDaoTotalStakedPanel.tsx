import { NumericPanel } from 'components/numeric-panel';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { AnimateNumber } from '@terra-money/apps/components';
import { useNftDaoStakingInfo } from 'dao/hooks/useNftDaoStakingInfo';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import Big from 'big.js';

export const NftDaoTotalStakedPanel = () => {
  const { address, dao_membership_contract } = useCurrentDao();
  const { totalStaked, totalStakedPercent } = useNftDaoStakingInfo(address, dao_membership_contract);

  return (
    <NumericPanel
      title="Total staked"
      value={totalStaked}
      decimals={2}
      suffix={
        <AnimateNumber format={(v) => `${formatAmount(Big(v).toNumber(), { decimals: 1 })}%`}>
          {totalStakedPercent}
        </AnimateNumber>
      }
    />
  );
};

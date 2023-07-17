import { formatAmount } from 'lib/shared/utils/formatAmount';
import { useNftDaoStakingInfo } from 'dao/hooks/useNftDaoStakingInfo';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { Panel } from 'lib/ui/Panel/Panel';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { NumericStatistic } from 'lib/ui/NumericStatistic';

export const NftDaoTotalStakedPanel = () => {
  const { address, dao_membership_contract } = useCurrentDao();
  const { totalStaked, totalStakedPercent } = useNftDaoStakingInfo(address, dao_membership_contract);

  return (
    <Panel>
      <TitledSection title="Total staked">
        <NumericStatistic value={formatAmount(totalStaked.toNumber())} suffix={`${totalStakedPercent.toNumber()}%`} />
      </TitledSection>
    </Panel>
  );
};

import { formatAmount } from 'lib/shared/utils/formatAmount';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useCW721NumTokensQuery } from 'queries/useCW721NumTokensQuery';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { Panel } from 'lib/ui/Panel/Panel';
import { Text } from 'lib/ui/Text';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { Spinner } from 'lib/ui/Spinner';
import { NumericStatistic } from 'lib/ui/NumericStatistic';

export const NftDaoTotalSupplyPanel = () => {
  const { dao_membership_contract } = useCurrentDao();

  const { data, status } = useCW721NumTokensQuery(dao_membership_contract);

  return (
    <Panel>
      <TitledSection title="Total supply">
        <QueryDependant
          data={data}
          status={status}
          loading={() => <Spinner />}
          error={() => <Text>Failed to load</Text>}
          success={(amount) => <NumericStatistic value={formatAmount(amount.toNumber())} />}
        />
      </TitledSection>
    </Panel>
  );
};

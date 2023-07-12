import { useCW20TokenInfoQuery } from 'queries/useCW20TokenInfoQuery';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { Panel } from 'lib/ui/Panel/Panel';
import { Spinner } from 'lib/ui/Spinner';
import { Text } from 'lib/ui/Text';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { NumericStatistic } from 'lib/ui/NumericStatistic';

export const TokenDaoTotalSupplyPanel = () => {
  const { dao_membership_contract } = useCurrentDao();

  const { data, status } = useCW20TokenInfoQuery(dao_membership_contract);

  return (
    <Panel>
      <TitledSection title="Total supply">
        <QueryDependant
          data={data}
          status={status}
          loading={() => <Spinner />}
          error={() => <Text>Failed to load</Text>}
          success={(token) => (
            <NumericStatistic value={formatAmount(fromChainAmount(token.total_supply, token.decimals))} />
          )}
        />
      </TitledSection>
    </Panel>
  );
};

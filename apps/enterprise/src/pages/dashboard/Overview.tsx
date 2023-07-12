import { useAllDaosQuery } from 'dao/hooks/useAllDaosQuery';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { removeUndefinedItems } from 'lib/shared/utils/removeUndefinedItems';
import { sum } from 'lib/shared/utils/sum';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { NumericStatistic } from 'lib/ui/NumericStatistic';
import { Panel } from 'lib/ui/Panel/Panel';
import { Spinner } from 'lib/ui/Spinner';
import { Text } from 'lib/ui/Text';
import { useProposalsQuery } from 'queries';

export const Overview = () => {
  // TODO: get this a better way
  const { data: daos, status: daosStatus } = useAllDaosQuery();

  // TODO: need to fetch just the aggregated analytics value of this
  const { data: proposals, status: proposalsStatus } = useProposalsQuery({ limit: 100000 });

  const totalCommunityPools = sum(removeUndefinedItems((daos || []).map((dao) => dao.tvl)));

  return (
    <SameWidthChildrenRow minChildrenWidth={320} rowHeight={110} gap={16} fullWidth>
      <Panel>
        <TitledSection title="Total value of DAO community pools">
          <NumericStatistic value={formatAmount(totalCommunityPools)} suffix="USD" />
        </TitledSection>
      </Panel>
      <Panel>
        <TitledSection title="Total number of DAOs">
          <QueryDependant
            data={daos}
            status={daosStatus}
            error={() => <Text>Failed to load</Text>}
            loading={() => <Spinner />}
            success={(daos) => <NumericStatistic value={daos.length} />}
          />
        </TitledSection>
      </Panel>
      <Panel>
        <TitledSection title="Total number of proposals">
          <QueryDependant
            data={proposals}
            status={proposalsStatus}
            error={() => <Text>Failed to load</Text>}
            loading={() => <Spinner />}
            success={(proposals) => <NumericStatistic value={proposals.length} />}
          />
        </TitledSection>
      </Panel>
    </SameWidthChildrenRow>
  );
};

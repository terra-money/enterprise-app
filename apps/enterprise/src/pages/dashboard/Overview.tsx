import { NumericPanel } from 'components/numeric-panel';
import { useAllDaosQuery } from 'dao/hooks/useAllDaosQuery';
import { removeUndefinedItems } from 'lib/shared/utils/removeUndefinedItems';
import { sum } from 'lib/shared/utils/sum';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { useProposalsQuery } from 'queries';

export const Overview = () => {
  // TODO: get this a better way
  const { data: daos, isLoading: isLoadingDAOs } = useAllDaosQuery();

  // TODO: need to fetch just the aggregated analytics value of this
  const { data: polls = [], isLoading: isLoadingPolls } = useProposalsQuery({ limit: 100000 });

  const totalCommunityPools = sum(removeUndefinedItems((daos || []).map((dao) => dao.tvl)));

  return (
    <SameWidthChildrenRow minChildrenWidth={320} rowHeight={110} gap={16} fullWidth>
      <NumericPanel
        title="Total value of DAO community pools"
        value={totalCommunityPools}
        suffix="USD"
        isLoading={isLoadingDAOs}
      />
      <NumericPanel title="Total number of DAOs" value={daos?.length} isLoading={daos === undefined || isLoadingDAOs} />
      <NumericPanel
        title="Total number of proposals"
        value={polls?.length}
        isLoading={polls === undefined || isLoadingPolls}
      />
    </SameWidthChildrenRow>
  );
};

import { AnimateNumber } from '@terra-money/apps/components';
import { usePrice } from '@terra-money/apps/hooks';
import { demicrofy, formatAmount } from '@terra-money/apps/libs/formatting';
import { LUNA, u } from '@terra-money/apps/types';
import Big from 'big.js';
import { NumericPanel } from 'components/numeric-panel';
import { useAllDaosQuery } from 'dao/hooks/useAllDaosQuery';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { useCommunityPoolQuery, useProposalsQuery } from 'queries';

export const Overview = () => {
  // TODO: get this a better way
  const { data: daos, isLoading: isLoadingDAOs } = useAllDaosQuery();

  // TODO: need to fetch just the aggregated analytics value of this
  const { data: polls = [], isLoading: isLoadingPolls } = useProposalsQuery({ limit: 100000 });

  const { data: communityPool = Big(0) as u<Big>, isLoading: isLoadingCommunityPool } = useCommunityPoolQuery();

  const communityPoolTotal = demicrofy(communityPool, LUNA.decimals);

  const price = usePrice(LUNA);

  const communityPoolValue = price ? communityPoolTotal.mul(price) : Big(0);

  return (
    <SameWidthChildrenRow minChildrenWidth={320} rowHeight={172} gap={16} fullWidth>
      <NumericPanel
        title="Community pool total value"
        value={communityPoolValue}
        suffix="USD"
        isLoading={isLoadingCommunityPool}
        footnote={
          <AnimateNumber format={(v) => `${formatAmount(v, { decimals: 0 })} ${LUNA.symbol}`}>
            {communityPoolTotal}
          </AnimateNumber>
        }
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

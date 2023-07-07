import { getValueProviderSetup } from '@terra-money/apps/utils';
import { useMinimumEligibleWeightQuery } from 'dao/hooks/useMinimumEligibleWeightQuery';
import { Spinner } from 'lib/ui/Spinner';

interface Props {
  children: React.ReactNode;
}

const { provider: MinimumWeightForRewardsProvider, useValue: useCurrentDaoMinimumWeightForRewards } =
  getValueProviderSetup<number>('CurrentDAOMinimumWeightForRewards');

export { useCurrentDaoMinimumWeightForRewards };

export const CurrentDAOMinimumWeightForRewardsProvider = ({ children }: Props) => {
  const { data: minWeight } = useMinimumEligibleWeightQuery();

  if (minWeight === undefined) {
    return <Spinner />;
  }

  return <MinimumWeightForRewardsProvider value={minWeight}>{children}</MinimumWeightForRewardsProvider>;
};

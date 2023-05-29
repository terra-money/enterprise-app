import { getValueProviderSetup } from '@terra-money/apps/utils';
import { Throbber } from 'components/primitives';
import { useMinimumEligibleWeightQuery } from 'dao/hooks/useMinimumEligibleWeightQuery';

interface Props {
  children: React.ReactNode;
}

const { provider: MinimumWeightForRewardsProvider, useValue: useCurrentDaoMinimumWeightForRewards } =
  getValueProviderSetup<number>('CurrentDAOMinimumWeightForRewards');

export { useCurrentDaoMinimumWeightForRewards };

export const CurrentDAOMinimumWeightForRewardsProvider = ({ children }: Props) => {
  const { data: minWeight } = useMinimumEligibleWeightQuery();

  if (minWeight === undefined) {
    return <Throbber />;
  }

  console.log('min weight: ', minWeight);

  return <MinimumWeightForRewardsProvider value={minWeight}>{children}</MinimumWeightForRewardsProvider>;
};

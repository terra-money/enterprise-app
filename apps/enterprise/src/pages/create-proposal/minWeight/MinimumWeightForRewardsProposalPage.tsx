import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { CurrentDAOMinimumWeightForRewardsProvider } from './CurrentDAOMinimumWeightForRewardsProvider';
import {
  UpdateMinimumWeightForRewardsFormMultisigOrNftDao,
  UpdateMinimumWeightForRewardsFormTokenDao,
} from './UpdateMinimumWeightForRewardsForm';
import { CurrentDAOTokenProvider } from 'dao/components/CurrentDaoTokenProvider';

export const MinimumWeightForRewardsProposalPage = () => {
  const { dao_type } = useCurrentDao();

  return (
    <CurrentDAOMinimumWeightForRewardsProvider>
      {dao_type === 'token' ? (
        <CurrentDAOTokenProvider>
          <UpdateMinimumWeightForRewardsFormTokenDao />
        </CurrentDAOTokenProvider>
      ) : (
        <UpdateMinimumWeightForRewardsFormMultisigOrNftDao />
      )}
    </CurrentDAOMinimumWeightForRewardsProvider>
  );
};

import { WhitelistedAssetsProposalForm } from './WhitelistedAssetsProposalForm';
import { CurrentDAOWhitelistedAssetsProvider } from './CurrentDAOWhitelistedAssetsProvider';

export const UpdateWhitelistedAssetsProposalPage = () => {
  return (
    <CurrentDAOWhitelistedAssetsProvider>
      <WhitelistedAssetsProposalForm />
    </CurrentDAOWhitelistedAssetsProvider>
  );
};

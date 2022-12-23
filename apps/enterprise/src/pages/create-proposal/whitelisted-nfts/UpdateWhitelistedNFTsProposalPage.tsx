import { WhitelistedNFTsProposalForm } from './WhitelistedNFTsProposalForm';
import { CurrentDAOWhitelistedNFTsProvider } from './CurrentDAOWhitelistedNFTsProvider';

export const UpdateWhitelistedNFTsProposalPage = () => {
  return (
    <CurrentDAOWhitelistedNFTsProvider>
      <WhitelistedNFTsProposalForm />
    </CurrentDAOWhitelistedNFTsProvider>
  );
};

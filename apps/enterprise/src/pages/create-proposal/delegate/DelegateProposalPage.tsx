import { CurrentDAOTreasuryTokensProvider } from '../spend/CurrentDAOTreasuryTokentsProvider';
import { DelegateProposalForm } from './DelegateProposalForm';

export const DelegateProposalPage = () => {
  return (
    <CurrentDAOTreasuryTokensProvider>
      <DelegateProposalForm />
    </CurrentDAOTreasuryTokensProvider>
  );
};

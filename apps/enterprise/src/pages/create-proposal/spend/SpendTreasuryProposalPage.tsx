import { SpendTreasuryProposalForm } from './SpendTreasuryProposalForm';
import { CurrentDAOTreasuryTokensProvider } from './CurrentDAOTreasuryTokentsProvider';

export const SpendTreasuryProposalPage = () => {
  return (
    <CurrentDAOTreasuryTokensProvider>
      <SpendTreasuryProposalForm />
    </CurrentDAOTreasuryTokensProvider>
  );
};

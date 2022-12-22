import { LoadingPage } from 'pages/shared/LoadingPage';
import { useParams } from 'react-router';
import { useDAOQuery } from 'queries';
import { CW20Addr } from '@terra-money/apps/types';
import { CurrentDaoProvider } from 'pages/shared/CurrentDaoProvider';
import { Navigation } from 'components/Navigation';
import { SpendTreasuryProposalForm } from './SpendTreasuryProposalForm';
import { CurrentDAOTreasuryTokensProvider } from './CurrentDAOTreasuryTokentsProvider';

export const SpendTreasuryProposalPage = () => {
  const { address } = useParams();

  const { data: dao, isLoading } = useDAOQuery(address as CW20Addr);

  return (
    <Navigation>
      <LoadingPage isLoading={isLoading}>
        {dao && (
          <CurrentDaoProvider value={dao}>
            <CurrentDAOTreasuryTokensProvider>
              <SpendTreasuryProposalForm />
            </CurrentDAOTreasuryTokensProvider>
          </CurrentDaoProvider>
        )}
      </LoadingPage>
    </Navigation>
  );
};

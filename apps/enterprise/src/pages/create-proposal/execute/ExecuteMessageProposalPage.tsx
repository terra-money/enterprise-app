import { LoadingPage } from 'pages/shared/LoadingPage';
import { useParams } from 'react-router';
import { useCW20TokenInfoQuery, useDAOQuery } from 'queries';
import { CW20Addr } from '@terra-money/apps/types';
import { CurrentDaoProvider } from 'pages/shared/CurrentDaoProvider';
import { CurrentTokenProvider } from 'pages/shared/CurrentTokenProvider';
import { ExecuteMessageProposalForm } from './ExecuteMessageProposalForm';
import { Navigation } from 'components/Navigation';

export const ExecuteMessageProposalPage = () => {
  const { address } = useParams();

  const { data: dao, isLoading } = useDAOQuery(address as CW20Addr);

  const hasToken = dao && dao.type === 'token';

  const { data: token } = useCW20TokenInfoQuery(dao?.membershipContractAddress || '', {
    enabled: hasToken,
  });

  return (
    <Navigation>
      <LoadingPage isLoading={isLoading}>
        {dao && (
          <CurrentDaoProvider value={dao}>
            {((hasToken && token) || !hasToken) && (
              <CurrentTokenProvider value={{ token }}>
                <ExecuteMessageProposalForm />
              </CurrentTokenProvider>
            )}
          </CurrentDaoProvider>
        )}
      </LoadingPage>
    </Navigation>
  );
};

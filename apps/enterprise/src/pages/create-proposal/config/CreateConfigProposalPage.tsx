import { NavigationLayout } from 'components/layout/NavigationLayout';
import { LoadingPage } from 'pages/shared/LoadingPage';
import { useParams } from 'react-router';
import { useCW20TokenInfoQuery, useDAOQuery } from 'queries';
import { CW20Addr } from '@terra-money/apps/types';
import { ConfigProposalForm } from './ConfigProposalForm';
import { CurrentDaoProvider } from 'pages/shared/CurrentDaoProvider';
import { CurrentTokenProvider } from 'pages/shared/CurrentTokenProvider';

export const CreateConfigProposalPage = () => {
  const { address } = useParams();

  const { data: dao, isLoading } = useDAOQuery(address as CW20Addr);

  const hasToken = dao && dao.type === 'token';

  const { data: token } = useCW20TokenInfoQuery(dao?.membershipContractAddress || '', {
    enabled: hasToken,
  });

  return (
    <NavigationLayout>
      <LoadingPage isLoading={isLoading}>
        {dao && (
          <CurrentDaoProvider value={dao}>
            {((hasToken && token) || !hasToken) && (
              <CurrentTokenProvider value={{ token }}>
                <ConfigProposalForm />
              </CurrentTokenProvider>
            )}
          </CurrentDaoProvider>
        )}
      </LoadingPage>
    </NavigationLayout>
  );
};

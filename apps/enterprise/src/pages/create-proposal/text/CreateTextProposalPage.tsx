import { NavigationLayout } from 'components/layout/NavigationLayout';
import { LoadingPage } from 'pages/shared/LoadingPage';
import { useParams } from 'react-router';
import { useDAOQuery } from 'queries';
import { CW20Addr } from '@terra-money/apps/types';
import { CurrentDaoProvider } from 'pages/shared/CurrentDaoProvider';
import { TextProposalForm } from './TextProposalForm';

export const CreateTextProposalPage = () => {
  const { address } = useParams();

  const { data: dao, isLoading } = useDAOQuery(address as CW20Addr);

  return (
    <NavigationLayout>
      <LoadingPage isLoading={isLoading}>
        {dao && (
          <CurrentDaoProvider value={dao}>
            <TextProposalForm />
          </CurrentDaoProvider>
        )}
      </LoadingPage>
    </NavigationLayout>
  );
};

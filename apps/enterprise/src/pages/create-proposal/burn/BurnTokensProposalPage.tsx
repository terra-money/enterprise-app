import { LoadingPage } from 'pages/shared/LoadingPage';
import { useParams } from 'react-router';
import { useDAOQuery } from 'queries';
import { CW20Addr } from '@terra-money/apps/types';
import { CurrentDaoProvider } from 'pages/shared/CurrentDaoProvider';
import { Navigation } from 'components/Navigation';
import { BurnTokensProposalForm } from './BurnTokensProposalForm';
import { CurrentDAOMultisigMembersProvider } from '../multisig-members/CurrentDAOMultisigMembersProvider';

export const BurnTokensProposalPage = () => {
  const { address } = useParams();

  const { data: dao, isLoading } = useDAOQuery(address as CW20Addr);

  return (
    <Navigation>
      <LoadingPage isLoading={isLoading}>
        {dao && (
          <CurrentDaoProvider value={dao}>
            <CurrentDAOMultisigMembersProvider>
              <BurnTokensProposalForm />
            </CurrentDAOMultisigMembersProvider>
          </CurrentDaoProvider>
        )}
      </LoadingPage>
    </Navigation>
  );
};

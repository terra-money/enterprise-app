import { useCW20TokenInfoQuery } from 'queries';
import { ConfigProposalForm } from './ConfigProposalForm';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { CurrentTokenProvider } from 'pages/shared/CurrentTokenProvider';

export const CreateConfigProposalPage = () => {
  const dao = useCurrentDao();

  const hasToken = dao && dao.dao_type === 'token';

  const { data: token } = useCW20TokenInfoQuery(dao?.dao_membership_contract || '', {
    enabled: hasToken,
  });

  if ((hasToken && token) || !hasToken) {
    return (
      <CurrentTokenProvider value={{ token }}>
        <ConfigProposalForm />
      </CurrentTokenProvider>
    );
  }

  return null;
};

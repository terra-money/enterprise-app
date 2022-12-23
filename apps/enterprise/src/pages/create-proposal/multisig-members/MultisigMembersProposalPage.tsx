import { MultisigMembersProposalForm } from './MultisigMembersProposalForm';
import { CurrentDAOMultisigMembersProvider } from './CurrentDAOMultisigMembersProvider';

export const MultisigMembersProposalPage = () => {
  return (
    <CurrentDAOMultisigMembersProvider>
      <MultisigMembersProposalForm />
    </CurrentDAOMultisigMembersProvider>
  );
};

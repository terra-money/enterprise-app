import { ProposalForm } from '../shared/ProposalForm';

import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

import { useDelegationsQuery } from 'chain/queries/useDelegationsQuery';

export const UndelegateProposalForm = () => {
  const dao = useCurrentDao();
  const { data: delegations } = useDelegationsQuery(dao.address);
  console.log(delegations);

  return (
    <ProposalForm
      disabled={false}
      getProposalActions={() => {
        return [];
      }}
    >
      Coming soon!
    </ProposalForm>
  );
};

import { getValueProviderSetup } from 'lib/shared/utils/getValueProviderSetup';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { Spinner } from 'lib/ui/Spinner';
import { useMultisigMembersQuery } from 'queries/useMultisigMembersQuery';
import { MultisigMember } from 'types/MultisigMember';

interface Props {
  children: React.ReactNode;
}

const { provider: MultisigMembersProvider, useValue: useCurrentDaoMultisigMembers } =
  getValueProviderSetup<MultisigMember[]>('MultisigMembers');

export { useCurrentDaoMultisigMembers };

export const CurrentDAOMultisigMembersProvider = ({ children }: Props) => {
  const dao = useCurrentDao();

  const { data: members } = useMultisigMembersQuery(dao.dao_membership_contract);

  if (!members) {
    return <Spinner />;
  }

  return <MultisigMembersProvider value={members}>{children}</MultisigMembersProvider>;
};

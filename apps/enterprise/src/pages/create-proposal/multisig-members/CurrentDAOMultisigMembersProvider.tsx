import { CW20Addr } from '@terra-money/apps/types';
import { getValueProviderSetup } from '@terra-money/apps/utils';
import { Throbber } from 'components/primitives';
import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';
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

  const { data: members } = useMultisigMembersQuery(dao.membershipContractAddress as CW20Addr);

  if (!members) {
    return <Throbber />;
  }

  return <MultisigMembersProvider value={members}>{children}</MultisigMembersProvider>;
};

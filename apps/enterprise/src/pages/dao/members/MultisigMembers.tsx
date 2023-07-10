import { DAO } from 'types';
import { Stack } from 'lib/ui/Stack';
import { useMultisigMembersQuery } from 'queries/useMultisigMembersQuery';

import { MultisigMemberItem } from './MultisigMemberItem';
import { Spinner } from 'lib/ui/Spinner';

interface MultisigMembersProps {
  dao: DAO;
}

export const MultisigMembers = (props: MultisigMembersProps) => {
  const { dao } = props;

  const { data: members = [], isLoading } = useMultisigMembersQuery(dao.membershipContractAddress);

  return (
    <Stack gap={16} direction="column">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {members.map((member) => (
            <MultisigMemberItem key={member.addr} {...member} />
          ))}
        </>
      )}
    </Stack>
  );
};

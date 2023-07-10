import { DAO } from 'types';
import { Container } from '@terra-money/apps/components';
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
    <Container gap={16} direction="column">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {members.map((member) => (
            <MultisigMemberItem key={member.addr} {...member} />
          ))}
        </>
      )}
    </Container>
  );
};

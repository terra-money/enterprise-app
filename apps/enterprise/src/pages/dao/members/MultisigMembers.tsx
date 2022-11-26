import { DAO } from 'types';
import { Throbber } from 'components/primitives';
import { Container } from '@terra-money/apps/components';
import { useMultisigMembersQuery } from 'queries/useMultisigMembersQuery';
import { CW20Addr } from '@terra-money/apps/types';
import { MultisigMemberItem } from './MultisigMemberItem';

interface MultisigMembersProps {
  dao: DAO;
}

export const MultisigMembers = (props: MultisigMembersProps) => {
  const { dao } = props;

  const { data: members = [], isLoading } = useMultisigMembersQuery(dao.membershipContractAddress as CW20Addr);

  return (
    <Container gap={16} direction="column">
      {isLoading ? (
        <Throbber />
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

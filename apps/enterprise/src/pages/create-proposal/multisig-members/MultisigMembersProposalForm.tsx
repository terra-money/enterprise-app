import { ProposalForm } from '../shared/ProposalForm';
import { useCurrentDaoMultisigMembers } from './CurrentDAOMultisigMembersProvider';
import { useMemo, useState } from 'react';
import { validateMembers } from 'pages/create-dao/multisig/helpers/validateMembers';
import { MultisigMemberInput } from 'pages/create-dao/multisig/member/MultisigMemberInput';
import { EMPTY_MEMBER } from 'pages/create-dao/DaoWizardFormProvider';
import { toUpdateMultisigMembershipMsg } from './helpers/toUpdateMultisigMembershipMsg';
import { isFormStateValid } from 'lib/shared/hooks/useForm';
import { getRecord } from 'lib/shared/utils/getRecord';
import { removeAtIndex } from 'lib/shared/utils/removeAtIndex';
import { updateAtIndex } from 'lib/shared/utils/updateAtIndex';
import { AddButton } from 'lib/ui/buttons/AddButton';

export const MultisigMembersProposalForm = () => {
  const initialMembers = useCurrentDaoMultisigMembers();

  const [members, setMembers] = useState(initialMembers);
  const areSameMembers = useMemo(() => {
    const membersRecord = getRecord(members, (member) => member.addr);
    if (initialMembers.some((member) => membersRecord[member.addr]?.weight !== member.weight)) {
      return false;
    }

    return initialMembers.length === members.length;
  }, [initialMembers, members]);

  const validatedMembers = useMemo(() => validateMembers(members), [members]);
  const hasInvalidMember = useMemo(
    () => validatedMembers.some((member) => !isFormStateValid(member)),
    [validatedMembers]
  );

  return (
    <ProposalForm
      disabled={areSameMembers || hasInvalidMember}
      getProposalActions={() => [
        { modify_multisig_membership: toUpdateMultisigMembershipMsg(initialMembers, members) },
      ]}
    >
      {members.map((member, index) => {
        return (
          <MultisigMemberInput
            key={index}
            onRemove={() => setMembers(removeAtIndex(members, index))}
            {...validatedMembers[index]}
            onChange={(params) => {
              setMembers(updateAtIndex(members, index, (value) => ({ ...value, ...params })));
            }}
          />
        );
      })}
      {!hasInvalidMember && <AddButton size="l" onClick={() => setMembers([...members, EMPTY_MEMBER])} />}
    </ProposalForm>
  );
};

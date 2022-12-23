import { ProposalForm } from '../shared/ProposalForm';
import { proposalTitle } from '../SelectProposalTypePage';
import { useCurrentDaoMultisigMembers } from './CurrentDAOMultisigMembersProvider';
import { useMemo, useState } from 'react';
import { getRecord, isFormStateValid, removeByIndex, updateAtIndex } from '@terra-money/apps/utils';
import { validateMembers } from 'pages/create-dao/multisig/helpers/validateMembers';
import { MultisigMemberInput } from 'pages/create-dao/multisig/member/MultisigMemberInput';
import { AddButton } from 'components/add-button';
import { EMPTY_MEMBER } from 'pages/create-dao/DaoWizardFormProvider';
import { toUpdateMultisigMembershipMsg } from './helpers/toUpdateMultisigMembershipMsg';

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
      title={proposalTitle.members}
    >
      {members.map((member, index) => {
        return (
          <MultisigMemberInput
            key={index}
            onRemove={() => setMembers(removeByIndex(members, index))}
            {...validatedMembers[index]}
            onChange={(params) => {
              setMembers(updateAtIndex(members, index, { ...member, ...params }));
            }}
          />
        );
      })}
      {!hasInvalidMember && <AddButton onClick={() => setMembers([...members, EMPTY_MEMBER])} />}
    </ProposalForm>
  );
};

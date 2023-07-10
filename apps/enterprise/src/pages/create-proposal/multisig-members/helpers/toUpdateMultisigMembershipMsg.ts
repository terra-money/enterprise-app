import { getRecord } from 'lib/shared/utils/getRecord';
import { enterprise } from 'types/contracts';
import { MultisigMember } from 'types/MultisigMember';

export const toUpdateMultisigMembershipMsg = (
  oldMembers: MultisigMember[],
  newMembers: MultisigMember[]
): enterprise.ModifyMultisigMembershipMsg => {
  const oldMembersRecord = getRecord(oldMembers, (member) => member.addr);
  const newMembersRecord = getRecord(newMembers, (member) => member.addr);

  const changedOldMembers = oldMembers.filter((member) => newMembersRecord[member.addr]?.weight !== member.weight);

  const members = [
    ...changedOldMembers.map((member) => ({
      addr: member.addr,
      weight: newMembersRecord[member.addr]?.weight ?? 0,
    })),
    ...newMembers.filter((member) => !oldMembersRecord[member.addr]),
  ];

  return {
    edit_members: members.map(({ addr, weight }) => ({ address: addr, weight: weight.toString() })),
  };
};

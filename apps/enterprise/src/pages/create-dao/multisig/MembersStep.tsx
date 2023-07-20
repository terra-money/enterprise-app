import { Stack } from 'lib/ui/Stack';
import { WizardStep } from '../WizardStep';
import { MultisigMemberInput } from './member/MultisigMemberInput';
import { EMPTY_MEMBER, useDaoWizardForm } from '../DaoWizardFormProvider';
import { MultisigMember } from 'types/MultisigMember';
import { isFormStateValid } from 'lib/shared/hooks/useForm';
import { AddButton } from 'lib/ui/buttons/AddButton';

const updateMember = (members: MultisigMember[], index: number, params: Partial<MultisigMember>): MultisigMember[] => {
  return members.map((member, i) => {
    if (i === index) {
      return {
        ...member,
        ...params,
      };
    }
    return {
      ...member,
    };
  });
};

const deleteAddress = (members: MultisigMember[], index: number): MultisigMember[] => {
  return members.filter((_, i) => i !== index);
};

export function MembersStep() {
  const {
    formState: { members },
    formInput,
  } = useDaoWizardForm();

  const areAllMembersValid = members.every(isFormStateValid);

  return (
    <WizardStep
      title="Add members to the multisig"
      subTitle="You need at least two members to create a multisig DAO. Weights are the number of votes given to an address."
    >
      <Stack gap={24} direction="column" as="section">
        {members.map((formState, index) => {
          return (
            <MultisigMemberInput
              key={index}
              onRemove={() => formInput({ members: deleteAddress(members, index) })}
              {...formState}
              onChange={(params) => {
                formInput({ members: updateMember(members, index, params) });
              }}
            />
          );
        })}
        {areAllMembersValid && (
          <AddButton size="l" onClick={() => formInput({ members: [...members, EMPTY_MEMBER] })} />
        )}
      </Stack>
    </WizardStep>
  );
}

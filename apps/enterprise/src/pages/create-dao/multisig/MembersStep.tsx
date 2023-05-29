import { Container } from '@terra-money/apps/components';
import { WizardStep } from '../WizardStep';
import styles from './MembersStep.module.sass';
import { MultisigMemberInput } from './member/MultisigMemberInput';
import { isFormStateValid } from '@terra-money/apps/utils';
import { EMPTY_MEMBER, useDaoWizardForm } from '../DaoWizardFormProvider';
import { AddButton } from 'components/add-button';
import { MultisigMember } from 'types/MultisigMember';

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
      <Container gap={24} className={styles.membersList} direction="column" component="section">
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
        {areAllMembersValid && <AddButton onClick={() => formInput({ members: [...members, EMPTY_MEMBER] })} />}
      </Container>
    </WizardStep>
  );
}

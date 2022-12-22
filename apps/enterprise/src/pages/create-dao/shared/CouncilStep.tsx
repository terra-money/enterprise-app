import { removeByIndex, updateAtIndex } from '@terra-money/apps/utils';
import { AddButton } from 'components/add-button';
import { DeleteIconButton } from 'components/delete-icon-button';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { HStack, VStack } from 'lib/ui/Stack';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { WizardStep } from '../WizardStep';

export function CouncilStep() {
  const {
    formInput,
    formState: { council, isValid },
  } = useDaoWizardForm();

  return (
    <WizardStep title="Add council members to your DAO" subTitle="(Optional)">
      <VStack gap={8}>
        {council.map((member, index) => (
          <HStack gap={16} alignItems="center">
            <TextInput
              label={`Council member #${index + 1}`}
              placeholder="Enter council member's address"
              value={member.address}
              error={member.addressError}
              onValueChange={(address) => formInput({ council: updateAtIndex(council, index, { address }) })}
            />
            <DeleteIconButton onClick={() => formInput({ council: removeByIndex(council, index) })} />
          </HStack>
        ))}
        {isValid && <AddButton onClick={() => formInput({ council: [...council, { address: '' }] })} />}
      </VStack>
    </WizardStep>
  );
}

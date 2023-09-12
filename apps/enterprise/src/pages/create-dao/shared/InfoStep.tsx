import { VStack } from 'lib/ui/Stack';
import { DaoInfoInput, useDaoWizardForm } from '../DaoWizardFormProvider';
import { WizardStep } from '../WizardStep';
import { TextArea } from 'lib/ui/inputs/TextArea';
import { TextInput } from 'lib/ui/inputs/TextInput';

export function InfoStep() {
  const {
    formInput,
    formState: { info },
  } = useDaoWizardForm();

  const onChange = (fields: Partial<DaoInfoInput>) => {
    formInput({ info: { ...info, ...fields } });
  };

  return (
    <WizardStep title="What is the name of your DAO?" subTitle="Choose a memorable and descriptive name">
      <VStack gap={16}>
        <TextInput
          label="Name"
          placeholder="Enter a name for your DAO"
          value={info.name}
          error={info.name?.length > 0 ? info.nameError : undefined}
          onValueChange={(name) => onChange({ name })}
        />
        <TextArea
          rows={6}
          maxLength={1120}
          label="Description"
          value={info.description}
          error={info.descriptionError}
          onValueChange={(description) => onChange({ description })}
        />
        <TextInput
          label="Logo URL"
          placeholder="Enter the URL of your DAO's logo"
          value={info.logo}
          error={info.logoError}
          onValueChange={(logo) => onChange({ logo })}
        />
      </VStack>
    </WizardStep>
  );
}

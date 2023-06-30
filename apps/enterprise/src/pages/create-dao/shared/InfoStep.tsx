import { Stack } from '@mui/material';
import { DaoInfoInput, useDaoWizardForm } from '../DaoWizardFormProvider';
import { WizardInput } from '../WizardInput';
import { WizardStep } from '../WizardStep';
import { TextArea } from 'lib/ui/inputs/TextArea';

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
      <Stack direction="column" spacing={4}>
        <WizardInput
          label="Name"
          placeholder="Enter a name for your DAO"
          value={info.name}
          error={info.name?.length > 0 ? info.nameError : undefined}
          onChange={({ currentTarget }) => onChange({ name: currentTarget.value })}
        />
        <TextArea
          rows={6}
          maxLength={280}
          label="Description"
          value={info.description}
          error={info.descriptionError}
          onValueChange={(description) => onChange({ description })}
        />
        <WizardInput
          label="Logo URL"
          placeholder="Enter the URL of your DAO's logo"
          value={info.logo}
          error={info.logoError}
          onChange={({ currentTarget }) => onChange({ logo: currentTarget.value })}
        />
      </Stack>
    </WizardStep>
  );
}

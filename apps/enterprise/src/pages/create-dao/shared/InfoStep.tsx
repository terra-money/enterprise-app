import { Stack } from '@mui/material';
import { DaoInfoInput, useDaoWizardForm } from '../DaoWizardFormProvider';
import { WizardInput } from '../WizardInput';
import { WizardStep } from '../WizardStep';

export function InfoStep() {
  const {
    formInput,
    formState: { info },
  } = useDaoWizardForm();

  const onChange = (fields: Partial<DaoInfoInput>) => {
    formInput({ info: { ...info, ...fields } });
  };

  return (
    <WizardStep
      title="What is the name of your DAO?"
      subTitle="It's best to choose a descriptive, memorable name for you and your members"
    >
      <Stack direction="column" spacing={4}>
        <WizardInput
          label="Name"
          placeholder="Type a name for your DAO"
          value={info.name}
          error={info.name?.length > 0 ? info.nameError : undefined}
          onChange={({ currentTarget }) => onChange({ name: currentTarget.value })}
        />
        <WizardInput
          label="Logo URL"
          placeholder="Type the URL of your DAO's logo"
          value={info.logo}
          error={info.logoError}
          onChange={({ currentTarget }) => onChange({ logo: currentTarget.value })}
        />
      </Stack>
    </WizardStep>
  );
}

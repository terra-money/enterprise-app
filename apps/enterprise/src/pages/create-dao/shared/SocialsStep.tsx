import { Stack } from 'lib/ui/Stack';
import { WizardStep } from '../WizardStep';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { SocialFields } from './SocialFields';

export function SocialsStep() {
  const {
    formInput,
    formState: { socials },
  } = useDaoWizardForm();

  return (
    <WizardStep title="Social media links" subTitle="Connect your DAO's social media">
      <Stack gap={24} direction="column" as="section">
        <SocialFields {...socials} onChange={(params) => formInput({ socials: { ...socials, ...params } })} />
      </Stack>
    </WizardStep>
  );
}

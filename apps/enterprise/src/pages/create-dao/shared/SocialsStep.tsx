import { Container } from '@terra-money/apps/components';
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
      <Container gap={24} direction="column" component="section">
        <SocialFields {...socials} onChange={(params) => formInput({ socials: { ...socials, ...params } })} />
      </Container>
    </WizardStep>
  );
}

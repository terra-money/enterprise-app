import { Container } from '@terra-money/apps/components';
import { WizardStep } from '../WizardStep';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { GovConfigFields } from './GovConfigFields';

export function GovConfigStep() {
  const {
    formState: { govConfig, type },
    formInput,
  } = useDaoWizardForm();

  return (
    <WizardStep title="Define governance parameters">
      <Container direction="column" gap={24}>
        <GovConfigFields
          daoType={type}
          value={govConfig}
          onChange={(params) => formInput({ govConfig: { ...govConfig, ...params } })}
        />
      </Container>
    </WizardStep>
  );
}

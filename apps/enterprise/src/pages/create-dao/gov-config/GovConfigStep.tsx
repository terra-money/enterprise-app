import { Container } from '@terra-money/apps/components';
import { WizardStep } from '../WizardStep';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { GovConfigFields } from './GovConfigFields';
import { MinimumWeightForRewardsInput } from '../MinimumWeightForRewardsInput';

export function GovConfigStep() {
  const {
    formState: { govConfig, type },
    formInput,
  } = useDaoWizardForm();

  return (
    <WizardStep title="DAO governance parameters">
      <Container direction="column" gap={24}>
        <GovConfigFields
          daoType={type}
          value={govConfig}
          onChange={(params) => formInput({ govConfig: { ...govConfig, ...params } })}
        />
        <MinimumWeightForRewardsInput
          value={govConfig.minimumWeightForRewards}
          onChange={(minimumWeightForRewards) => formInput({ govConfig: { ...govConfig, minimumWeightForRewards } })}
          error={govConfig.minimumWeightForRewardsError}
        />
      </Container>
    </WizardStep>
  );
}

import { LabeledValue } from 'lib/ui/LabeledValue';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { toPercents } from 'lib/shared/utils/toPercents';
import { pluralize } from 'lib/shared/utils/pluralize';

export const GovConfigReview = () => {
  const {
    formState: { govConfig },
  } = useDaoWizardForm();

  return (
    <>
      <LabeledValue name="Quorum">{toPercents(govConfig.quorum)}</LabeledValue>
      <LabeledValue name="Threshold">{toPercents(govConfig.threshold)}</LabeledValue>
      <LabeledValue name="Veto threshold">{toPercents(govConfig.vetoThreshold)}</LabeledValue>
      <LabeledValue name="Unlocking period">{pluralize(govConfig.unlockingPeriod, 'day')}</LabeledValue>
      <LabeledValue name="Vote duration">{pluralize(govConfig.voteDuration, 'day')}</LabeledValue>
      <LabeledValue name="Minimum deposit">{govConfig.minimumDeposit}</LabeledValue>
      <LabeledValue name="Minimum deposit">{govConfig.minimumDeposit}</LabeledValue>
      <LabeledValue name="Allow early proposal execution">
        {govConfig.allowEarlyProposalExecution ? 'Yes' : 'No'}
      </LabeledValue>
      <LabeledValue name="Minimum weight for rewards">{govConfig.minimumWeightForRewards}</LabeledValue>
    </>
  );
};

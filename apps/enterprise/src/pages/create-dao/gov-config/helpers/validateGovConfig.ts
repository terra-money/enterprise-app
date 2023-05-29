import { FormState } from '@terra-money/apps/hooks';
import { validateAmount } from '@terra-money/apps/utils';
import { DaoGovConfigInput } from '../DaoGovConfigInput';

export const validateUnlockingPeriod = (unlockingPeriod: number, voteDuration: number) => {
  if (unlockingPeriod < voteDuration) {
    return 'The vote duration must be longer than the unlocking period.';
  }
};

export const validateGovConfig = ({
  quorum,
  threshold,
  vetoThreshold,
  unlockingPeriod,
  voteDuration,
  minimumDeposit,
  allowEarlyProposalExecution,
  minimumWeightForRewards,
}: DaoGovConfigInput): FormState<DaoGovConfigInput> => {
  const formState: FormState<DaoGovConfigInput> = {
    quorum,
    threshold,
    unlockingPeriod,
    voteDuration,
    minimumDeposit,
    vetoThreshold,
    allowEarlyProposalExecution,
    minimumWeightForRewards,
  };

  formState.unlockingPeriodError = validateUnlockingPeriod(unlockingPeriod, voteDuration);

  formState.thresholdError = validateAmount(Math.round(threshold * 100), 50, 100, 'Threshold');
  formState.vetoThresholdError = validateAmount(Math.round(threshold * 100), 50, 100, 'Veto threshold');

  return formState;
};

import { FormState } from '@terra-money/apps/hooks';
import { validateAmount } from '@terra-money/apps/utils';
import { DaoGovConfigInput } from '../DaoGovConfigInput';

export const validateUnlockingPeriod = (unlockingPeriod: number, voteDuration: number) => {
  if (unlockingPeriod < voteDuration) {
    return 'Unstaking duration cannot be shorter than proposal voting duration';
  }
};

export const validateGovConfig = ({
  quorum,
  threshold,
  unlockingPeriod,
  voteDuration,
  minimumDeposit,
}: DaoGovConfigInput): FormState<DaoGovConfigInput> => {
  const formState: FormState<DaoGovConfigInput> = { quorum, threshold, unlockingPeriod, voteDuration, minimumDeposit };

  formState.unlockingPeriodError = validateUnlockingPeriod(unlockingPeriod, voteDuration);

  formState.thresholdError = validateAmount(Math.round(threshold * 100), 50, 100, 'Threshold');

  return formState;
};

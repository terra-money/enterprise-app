import { FormState } from 'lib/shared/hooks/useForm';
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

  return formState;
};

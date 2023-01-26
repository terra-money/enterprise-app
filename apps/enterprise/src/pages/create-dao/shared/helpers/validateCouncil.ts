import { FormState } from '@terra-money/apps/hooks';
import { validateAddress, validateAmount } from '@terra-money/apps/utils';
import { CouncilInput } from 'pages/create-dao/DaoWizardFormProvider';

export const validateCouncil = ({
  members,
  allowedProposalTypes,
  quorum,
  threshold,
}: CouncilInput): FormState<CouncilInput> => {
  const formState: FormState<CouncilInput> = { members, allowedProposalTypes, quorum, threshold };

  formState.members.map(({ address }) => ({
    address,
    addressError: validateAddress(address),
  }));

  if (allowedProposalTypes.length < 1) {
    formState.allowedProposalTypesError = 'At least one proposal type must be selected';
  }

  formState.thresholdError = validateAmount(Math.round(threshold * 100), 50, 100, 'Threshold');

  return formState;
};

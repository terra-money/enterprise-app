import { validateAddress } from 'chain/utils/validators';
import { FormState } from 'lib/shared/hooks/useForm';
import { validateAmount } from 'lib/shared/utils/validateAmount';
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
    formState.allowedProposalTypesError = 'Select at least one proposal type';
  }

  formState.thresholdError = validateAmount(Math.round(threshold * 100), 50, 100, 'Threshold');

  return formState;
};

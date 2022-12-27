import { FormState } from '@terra-money/apps/hooks';
import { validateAddress } from '@terra-money/apps/utils';
import { CouncilInput } from 'pages/create-dao/DaoWizardFormProvider';

export const validateCouncil = ({ members, allowedProposalTypes }: CouncilInput): FormState<CouncilInput> => {
  const formState: FormState<CouncilInput> = { members, allowedProposalTypes };

  formState.members.map(({ address }) => ({
    address,
    addressError: validateAddress(address),
  }));

  if (allowedProposalTypes.length < 1) {
    formState.allowedProposalTypesError = 'At least one proposal type must be selected';
  }

  return formState;
};

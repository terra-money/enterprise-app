import { FormState } from '@terra-money/apps/hooks';
import { validateLength, validateUrl } from '@terra-money/apps/utils';
import { DaoInfoInput } from 'pages/create-dao/DaoWizardFormProvider';

export const validateDaoInfo = ({ name, logo }: DaoInfoInput): FormState<DaoInfoInput> => {
  const formState: FormState<DaoInfoInput> = { name, logo };

  formState.nameError = validateLength(name, 3, 140, 'name');

  if (logo) {
    formState.logoError = validateUrl(logo);
  }

  return formState;
};

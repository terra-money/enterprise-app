import { FormState } from '@terra-money/apps/hooks';
import { validateLength, validateUrl } from '@terra-money/apps/utils';
import { DaoInfoInput } from 'pages/create-dao/DaoWizardFormProvider';

export const validateDaoInfo = ({ name, logo, description }: DaoInfoInput): FormState<DaoInfoInput> => {
  const formState: FormState<DaoInfoInput> = { name, logo, description };

  formState.nameError = validateLength(name, 3, 140, 'name');

  if (description) {
    formState.descriptionError = validateLength(description, 3, 2000, 'description');
  }

  if (logo) {
    formState.logoError = validateUrl(logo);
  }

  return formState;
};

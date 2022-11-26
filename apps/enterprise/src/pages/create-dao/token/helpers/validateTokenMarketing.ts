import { FormState } from '@terra-money/apps/hooks';
import { validateAddress, validateUrl } from '@terra-money/apps/utils';
import { TokenMarketing } from 'pages/create-dao/DaoWizardFormProvider';

export const validateTokenMarketing = ({
  description,
  logo,
  marketingOwner,
  project,
}: TokenMarketing): FormState<TokenMarketing> => {
  const formState: FormState<TokenMarketing> = {
    description,
    logo,
    marketingOwner,
    project,
  };

  if (logo) {
    formState.logoError = validateUrl(logo);
  }

  if (marketingOwner) {
    formState.marketingOwnerError = validateAddress(marketingOwner);
  }

  return formState;
};

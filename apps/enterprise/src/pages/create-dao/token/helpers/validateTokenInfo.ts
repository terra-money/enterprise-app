import { FormState } from '@terra-money/apps/hooks';
import { validateAddress, validateAmount, validateLength, validatePattern, validateUrl } from '@terra-money/apps/utils';
import { TokenInfo } from 'pages/create-dao/DaoWizardFormProvider';

export const validateTokenInfo = ({ decimals, name, symbol, description,
  logo,
  marketingOwner,
  project, }: TokenInfo): FormState<TokenInfo> => {
  const formState: FormState<TokenInfo> = {
    decimals, name, symbol, description,
    logo,
    marketingOwner,
    project,
  };

  formState.nameError = validateLength(name, 3, 140, 'name');
  formState.symbolError =
    validateLength(symbol, 3, 12, 'symbol') ??
    validatePattern(symbol, /[a-zA-Z]{3,12}$/, 'The symbol is not in the correct format');
  formState.decimalsError = validateAmount(decimals, 4, 18, 'decimals');

  if (logo) {
    formState.logoError = validateUrl(logo);
  }

  if (marketingOwner) {
    formState.marketingOwnerError = validateAddress(marketingOwner);
  }

  return formState;
};

import { FormState } from '@terra-money/apps/hooks';
import { validateAmount, validateLength, validatePattern } from '@terra-money/apps/utils';
import { TokenInfo } from 'pages/create-dao/DaoWizardFormProvider';

export const validateTokenInfo = ({ decimals, name, symbol }: TokenInfo): FormState<TokenInfo> => {
  const formState: FormState<TokenInfo> = { decimals, name, symbol };

  formState.nameError = validateLength(name, 3, 140, 'name');
  formState.symbolError =
    validateLength(symbol, 3, 12, 'symbol') ??
    validatePattern(symbol, /[a-zA-Z]{3,12}$/, 'The symbol is not in the correct format');
  formState.decimalsError = validateAmount(decimals, 4, 18, 'decimals');

  return formState;
};

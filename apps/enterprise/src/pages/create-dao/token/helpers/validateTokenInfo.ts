import { validateAddress } from 'chain/utils/validators';
import { FormState } from 'lib/shared/hooks/useForm';
import { validateAmount } from 'lib/shared/utils/validateAmount';
import { validateLength } from 'lib/shared/utils/validateLength';
import { validatePattern } from 'lib/shared/utils/validatePattern';
import { validateUrl } from 'lib/ui/utils/validateUrl';
import { TokenInfo } from 'pages/create-dao/DaoWizardFormProvider';

export const validateTokenInfo = ({
  decimals,
  name,
  symbol,
  description,
  logo,
  marketingOwner,
  project,
}: TokenInfo): FormState<TokenInfo> => {
  const formState: FormState<TokenInfo> = {
    decimals,
    name,
    symbol,
    description,
    logo,
    marketingOwner,
    project,
  };

  formState.nameError = validateLength(name, 3, 140, 'name');
  formState.symbolError =
    validateLength(symbol, 3, 12, 'symbol') ??
    validatePattern(symbol, /[a-zA-Z]{3,12}$/, 'Asset symbols can only be made of letters');
  formState.decimalsError = validateAmount(decimals, 4, 18, 'decimals');

  if (logo) {
    formState.logoError = validateUrl(logo);
  }

  if (marketingOwner) {
    formState.marketingOwnerError = validateAddress(marketingOwner);
  }

  return formState;
};

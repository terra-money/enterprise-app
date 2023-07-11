import { validateAddress } from 'chain/utils/validators';
import { FormState } from 'lib/shared/hooks/useForm';
import { validateAmount } from 'lib/shared/utils/validateAmount';
import { InitialBalance } from 'pages/create-dao/DaoWizardFormProvider';

export const UINT_128_MAX = 340282366920938463463374607431768211455;

export const validateInitialBalances = (initialBalances: InitialBalance[]): FormState<InitialBalance>[] => {
  return initialBalances.map(({ address, amount }) => {
    const formState: FormState<InitialBalance> = { address, amount };

    if (!address) {
      formState.addressError = 'Enter a Terra address';
    } else if (validateAddress(address)) {
      formState.addressError = 'Invalid Terra address';
    }

    formState.amountError = !amount ? 'Enter an amount' : validateAmount(amount, 1, UINT_128_MAX, 'Amount');

    return formState;
  });
};

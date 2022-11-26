import { FormState } from '@terra-money/apps/hooks';
import { validateAddress, validateAmount } from '@terra-money/apps/utils';
import { InitialBalance } from 'pages/create-dao/DaoWizardFormProvider';

export const UINT_128_MAX = 340282366920938463463374607431768211455;

export const validateInitialBalances = (initialBalances: InitialBalance[]): FormState<InitialBalance>[] => {
  return initialBalances.map(({ address, amount }) => {
    const formState: FormState<InitialBalance> = { address, amount };

    if (!address) {
      formState.addressError = 'Address is required';
    } else if (validateAddress(address)) {
      formState.addressError = 'Invalid Terra address';
    }

    formState.amountError =
      amount?.length === 0 ? 'The amount is required' : validateAmount(Number(amount), 1, UINT_128_MAX, 'Amount');

    return formState;
  });
};

import { toChainAmount } from 'chain/utils/toChainAmount';

import Big from 'big.js';
import { useForm } from 'lib/shared/hooks/useForm';

interface StakeTokenFormInput {
  amount?: number;
}

interface StakeTokenFormState extends StakeTokenFormInput {
  submitDisabled: boolean;
}

const initialState: StakeTokenFormState = {
  amount: undefined,
  submitDisabled: true,
};

interface UseStakeTokenFormOptions {
  balance: string;
  decimals: number;
}

export const useStakeTokenForm = (options: UseStakeTokenFormOptions) => {
  const { balance, decimals } = options;

  return useForm<StakeTokenFormInput, StakeTokenFormState>(async (input, getState, dispatch) => {
    const state = {
      ...getState(),
      ...input,
    };

    const uAmount = input.amount ? toChainAmount(input.amount, decimals) : Big(0);

    const submitDisabled = Big(uAmount).lte(0) || Big(uAmount).gt(balance);

    dispatch({ ...state, submitDisabled });
  }, initialState);
};

import { toChainAmount } from 'chain/utils/toChainAmount';

import Big from 'big.js';
import { useForm } from 'lib/shared/hooks/useForm';

interface UnstakeTokenFormInput {
  amount?: number;
}

interface UnstakeTokenFormState extends UnstakeTokenFormInput {
  submitDisabled: boolean;
}

const initialState: UnstakeTokenFormState = {
  amount: undefined,
  submitDisabled: true,
};

interface UseUnstakeTokenFormOptions {
  staked: Big;
  decimals: number;
}

export const useUnstakeTokenForm = (options: UseUnstakeTokenFormOptions) => {
  const { staked, decimals } = options;

  return useForm<UnstakeTokenFormInput, UnstakeTokenFormState>(async (input, getState, dispatch) => {
    const state = {
      ...getState(),
      ...input,
    };

    const uAmount = input.amount ? toChainAmount(input.amount, decimals) : Big(0);

    const submitDisabled = Big(uAmount).lte(0) || Big(uAmount).gt(staked);

    dispatch({ ...state, submitDisabled });
  }, initialState);
};

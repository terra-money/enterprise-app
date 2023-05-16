import { useForm } from '@terra-money/apps/hooks';
import { microfy } from '@terra-money/apps/libs/formatting';
import { u } from '@terra-money/apps/types';
import Big from 'big.js';

interface UnstakeTokenFormInput {
  amount?: string;
}

interface UnstakeTokenFormState extends UnstakeTokenFormInput {
  submitDisabled: boolean;
}

const initialState: UnstakeTokenFormState = {
  amount: '',
  submitDisabled: true,
};

interface UseUnstakeTokenFormOptions {
  staked: u<Big>;
  decimals: number;
}

export const useUnstakeTokenForm = (options: UseUnstakeTokenFormOptions) => {
  const { staked, decimals } = options;

  return useForm<UnstakeTokenFormInput, UnstakeTokenFormState>(async (input, getState, dispatch) => {
    const state = {
      ...getState(),
      ...input,
    };

    const uAmount = input.amount ? microfy(input.amount, decimals) : Big(0);

    const submitDisabled = uAmount.lte(0) || uAmount.gt(staked);

    dispatch({ ...state, submitDisabled });
  }, initialState);
};

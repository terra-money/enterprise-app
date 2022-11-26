import { useForm } from '@terra-money/apps/hooks';
import { microfy } from '@terra-money/apps/libs/formatting';
import { u } from '@terra-money/apps/types';
import { useConnectedWallet } from '@terra-money/wallet-provider';
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

  const connectedWallet = useConnectedWallet();

  return useForm<UnstakeTokenFormInput, UnstakeTokenFormState>(async (input, getState, dispatch) => {
    if (connectedWallet === undefined) {
      throw Error('The wallet is not connected');
    }

    const state = {
      ...getState(),
      ...input,
    };

    const uAmount = input.amount ? microfy(input.amount, decimals) : Big(0);

    const submitDisabled = uAmount.lte(0) || uAmount.gt(staked);

    dispatch({ ...state, submitDisabled });
  }, initialState);
};

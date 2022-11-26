import { useForm } from '@terra-money/apps/hooks';
import { microfy } from '@terra-money/apps/libs/formatting';
import { u } from '@terra-money/apps/types';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import Big from 'big.js';

interface StakeTokenFormInput {
  amount?: string;
}

interface StakeTokenFormState extends StakeTokenFormInput {
  submitDisabled: boolean;
}

const initialState: StakeTokenFormState = {
  amount: '',
  submitDisabled: true,
};

interface UseStakeTokenFormOptions {
  balance: u<Big>;
  decimals: number;
}

export const useStakeTokenForm = (options: UseStakeTokenFormOptions) => {
  const { balance, decimals } = options;

  const connectedWallet = useConnectedWallet();

  return useForm<StakeTokenFormInput, StakeTokenFormState>(async (input, getState, dispatch) => {
    if (connectedWallet === undefined) {
      throw Error('The wallet is not connected');
    }

    const state = {
      ...getState(),
      ...input,
    };

    const uAmount = input.amount ? microfy(input.amount, decimals) : Big(0);

    const submitDisabled = uAmount.lte(0) || uAmount.gt(balance);

    dispatch({ ...state, submitDisabled });
  }, initialState);
};

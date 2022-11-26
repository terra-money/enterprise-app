import { useForm } from '@terra-money/apps/hooks';
import { useConnectedWallet } from '@terra-money/wallet-provider';

interface UnstakeNFTFormInput {}

interface UnstakeNFTFormState extends UnstakeNFTFormInput {
  submitDisabled: boolean;
}

const initialState: UnstakeNFTFormState = {
  submitDisabled: false,
};

interface UseUnstakeNFTFormOptions {
  staked: string[];
}

export const useUnstakeNFTForm = (options: UseUnstakeNFTFormOptions) => {
  const { staked } = options;

  const connectedWallet = useConnectedWallet();

  return useForm<UnstakeNFTFormInput, UnstakeNFTFormState>(async (input, getState, dispatch) => {
    if (connectedWallet === undefined) {
      throw Error('The wallet is not connected');
    }

    const state = {
      ...getState(),
      ...input,
    };

    const submitDisabled = staked.length === 0;

    dispatch({ ...state, submitDisabled });
  }, initialState);
};

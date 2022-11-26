import { useForm } from '@terra-money/apps/hooks';
import { useConnectedWallet } from '@terra-money/wallet-provider';

interface StakeNFTFormInput {}

interface StakeNFTFormState extends StakeNFTFormInput {
  submitDisabled: boolean;
}

const initialState: StakeNFTFormState = {
  submitDisabled: false,
};

interface UseStakeNFTFormOptions {
  tokens: string[];
}

export const useStakeNFTForm = (options: UseStakeNFTFormOptions) => {
  const { tokens } = options;

  const connectedWallet = useConnectedWallet();

  return useForm<StakeNFTFormInput, StakeNFTFormState>(async (input, getState, dispatch) => {
    if (connectedWallet === undefined) {
      throw Error('The wallet is not connected');
    }

    const state = {
      ...getState(),
      ...input,
    };

    const submitDisabled = tokens.length === 0;

    dispatch({ ...state, submitDisabled });
  }, initialState);
};

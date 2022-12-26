import { useForm } from '@terra-money/apps/hooks';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { NftInfo } from 'chain/queries/useNftInfoQuery';

interface StakeNFTFormInput {}

interface StakeNFTFormState extends StakeNFTFormInput {
  submitDisabled: boolean;
}

const initialState: StakeNFTFormState = {
  submitDisabled: false,
};

interface UseStakeNFTFormOptions {
  nfts: NftInfo[];
}

export const useStakeNFTForm = ({ nfts }: UseStakeNFTFormOptions) => {
  const connectedWallet = useConnectedWallet();

  return useForm<StakeNFTFormInput, StakeNFTFormState>(async (input, getState, dispatch) => {
    if (connectedWallet === undefined) {
      throw Error('The wallet is not connected');
    }

    const state = {
      ...getState(),
      ...input,
    };

    const submitDisabled = nfts.length === 0;

    dispatch({ ...state, submitDisabled });
  }, initialState);
};

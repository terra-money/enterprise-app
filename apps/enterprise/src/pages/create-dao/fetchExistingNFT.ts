import { FormModifier } from '@terra-money/apps/hooks';
import { validateAddress } from '@terra-money/apps/utils';
import { NetworkInfo } from '@terra-money/wallet-provider';
import { fetchCW721ContractInfo } from 'queries';
import { DaoWizardState } from './DaoWizardFormProvider';

export const fetchExistingNFT = async (
  dispatch: FormModifier<DaoWizardState>,
  network: NetworkInfo,
  tokenAddr: string
) => {
  const existingNFTError = validateAddress(tokenAddr);

  dispatch({
    existingNFT: undefined,
    existingNFTLoading: existingNFTError === undefined,
    existingNFTError,
  });

  if (existingNFTError === undefined) {
    try {
      dispatch({
        existingNFT: await fetchCW721ContractInfo(network, tokenAddr),
        existingNFTLoading: false,
        existingNFTError: undefined,
      });
    } catch (e) {
      dispatch({
        existingNFT: undefined,
        existingNFTLoading: false,
        existingNFTError: 'Could not find the existing NFT.',
      });
    }
  }
};

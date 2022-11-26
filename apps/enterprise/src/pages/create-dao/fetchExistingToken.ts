import { FormModifier } from '@terra-money/apps/hooks';
import { validateAddress } from '@terra-money/apps/utils';
import { NetworkInfo } from '@terra-money/wallet-provider';
import { fetchCW20TokenInfo } from 'queries';
import { DaoWizardState } from './DaoWizardFormProvider';

export const fetchExistingToken = async (
  dispatch: FormModifier<DaoWizardState>,
  network: NetworkInfo,
  tokenAddr: string
) => {
  const existingTokenError = validateAddress(tokenAddr);

  dispatch({
    existingToken: undefined,
    existingTokenLoading: existingTokenError === undefined,
    existingTokenError,
  });

  if (existingTokenError === undefined) {
    try {
      dispatch({
        existingToken: await fetchCW20TokenInfo(network, tokenAddr),
        existingTokenLoading: false,
        existingTokenError: undefined,
      });
    } catch (e) {
      dispatch({
        existingToken: undefined,
        existingTokenLoading: false,
        existingTokenError: 'Could not find the existing token information.',
      });
    }
  }
};

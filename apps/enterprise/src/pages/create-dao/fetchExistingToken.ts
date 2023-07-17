import { fetchCW20TokenInfo } from 'queries';
import { DaoWizardState } from './DaoWizardFormProvider';
import { LCDClient } from '@terra-money/feather.js';
import { FormModifier } from 'lib/shared/hooks/useForm';
import { validateAddress } from 'chain/utils/validators';

export const fetchExistingToken = async (dispatch: FormModifier<DaoWizardState>, lcd: LCDClient, tokenAddr: string) => {
  const existingTokenError = validateAddress(tokenAddr);

  dispatch({
    existingToken: undefined,
    existingTokenLoading: existingTokenError === undefined,
    existingTokenError,
  });

  if (existingTokenError === undefined) {
    try {
      dispatch({
        existingToken: await fetchCW20TokenInfo(lcd, tokenAddr),
        existingTokenLoading: false,
        existingTokenError: undefined,
      });
    } catch (e) {
      dispatch({
        existingToken: undefined,
        existingTokenLoading: false,
        existingTokenError: 'The existing token could not be found.',
      });
    }
  }
};

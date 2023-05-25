import { FormModifier } from '@terra-money/apps/hooks';
import { validateAddress } from '@terra-money/apps/utils';
import { fetchCW3ListVoters } from 'queries';
import { DaoWizardState } from './DaoWizardFormProvider';
import { LCDClient } from '@terra-money/feather.js';

export const fetchExistingMultisigVoters = async (
  dispatch: FormModifier<DaoWizardState>,
  lcd: LCDClient,
  multisigAddr: string
) => {
  const existingMultisigVotersError = validateAddress(multisigAddr);

  dispatch({
    existingMultisigVoters: undefined,
    existingMultisigVotersLoading: existingMultisigVotersError === undefined,
    existingMultisigVotersError,
  });

  if (existingMultisigVotersError === undefined) {
    try {
      dispatch({
        existingMultisigVoters: await fetchCW3ListVoters(lcd, multisigAddr),
        existingMultisigVotersLoading: false,
        existingMultisigVotersError: undefined,
      });
    } catch (e) {
      dispatch({
        existingMultisigVoters: undefined,
        existingMultisigVotersLoading: false,
        existingMultisigVotersError: 'The existing multisig could not be found.',
      });
    }
  }
};

import { FormModifier } from '@terra-money/apps/hooks';
import { validateAddress } from '@terra-money/apps/utils';
import { NetworkInfo } from '@terra-money/wallet-provider';
import { fetchCW3ListVoters } from 'queries';
import { DaoWizardState } from './DaoWizardFormProvider';

export const fetchExistingMultisigVoters = async (
  dispatch: FormModifier<DaoWizardState>,
  network: NetworkInfo,
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
        existingMultisigVoters: await fetchCW3ListVoters(network, multisigAddr),
        existingMultisigVotersLoading: false,
        existingMultisigVotersError: undefined,
      });
    } catch (e) {
      dispatch({
        existingMultisigVoters: undefined,
        existingMultisigVotersLoading: false,
        existingMultisigVotersError: 'Could not find the existing multisig voters list.',
      });
    }
  }
};

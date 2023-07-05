import { TextInput } from 'lib/ui/inputs/TextInput';
import { useDaoWizardForm } from '../DaoWizardFormProvider';

export const MultisigAddressInput = () => {
  const {
    formState: { existingMultisigAddr, existingMultisigVotersLoading, existingMultisigVotersError },
    formInput,
  } = useDaoWizardForm();

  return (
    <TextInput
      label="Multisig address"
      placeholder="Enter your existing CW3 Multisig contract address"
      value={existingMultisigAddr}
      error={existingMultisigVotersError}
      isLoading={existingMultisigVotersLoading}
      onChange={(addr) => {
        formInput({ existingMultisigAddr: addr.currentTarget.value });
      }}
    />
  );
};

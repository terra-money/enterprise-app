import { TextInput } from 'lib/ui/inputs/TextInput';
import { useDaoWizardForm } from '../DaoWizardFormProvider';

export const TokenAddressInput = () => {
  const {
    formState: { existingTokenAddr, existingTokenLoading, existingTokenError },
    formInput,
  } = useDaoWizardForm();

  return (
    <TextInput
      label="Token address"
      placeholder="Enter your existing CW20 token contract address"
      value={existingTokenAddr}
      error={existingTokenError}
      isLoading={existingTokenLoading}
      onValueChange={(existingTokenAddr) => {
        formInput({ existingTokenAddr });
      }}
    />
  );
};

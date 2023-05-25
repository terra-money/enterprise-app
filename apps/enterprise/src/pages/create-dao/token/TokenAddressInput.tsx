import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { WizardInput } from '../WizardInput';

export const TokenAddressInput = () => {
  const {
    formState: { existingTokenAddr, existingToken, existingTokenLoading, existingTokenError },
    formInput,
  } = useDaoWizardForm();

  return (
    <WizardInput
      label="Token address"
      placeholder="Enter your existing CW20 token contract address"
      value={existingTokenAddr}
      error={existingTokenError}
      valid={existingToken !== undefined}
      loading={existingTokenLoading}
      onChange={(addr) => {
        formInput({ existingTokenAddr: addr.currentTarget.value });
      }}
    />
  );
};

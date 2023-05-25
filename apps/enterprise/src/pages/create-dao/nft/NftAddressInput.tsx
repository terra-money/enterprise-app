import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { WizardInput } from '../WizardInput';

export const NftAddressInput = () => {
  const {
    formState: { existingNFTAddr, existingNFT, existingNFTLoading, existingNFTError },
    formInput,
  } = useDaoWizardForm();

  return (
    <WizardInput
      label="NFT address"
      placeholder="Enter your existing CW721 NFT contract address"
      value={existingNFTAddr}
      error={existingNFTError}
      valid={existingNFT !== undefined}
      loading={existingNFTLoading}
      onChange={(addr) => {
        formInput({ existingNFTAddr: addr.currentTarget.value });
      }}
    />
  );
};

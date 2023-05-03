import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { WizardInput } from '../WizardInput';

export const NftAddressInput = () => {
  const {
    formState: { existingNFTAddr, existingNFT, existingNFTLoading, existingNFTError },
    formInput,
  } = useDaoWizardForm();

  return (
    <WizardInput
<<<<<<< Updated upstream
      label="NFT address"
      placeholder="Type your existing CW721 NFT address"
=======
      label="NFT contract address"
      placeholder="Type your existing CW721 NFT contract address"
>>>>>>> Stashed changes
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

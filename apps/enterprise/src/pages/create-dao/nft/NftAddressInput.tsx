import { TextInput } from 'lib/ui/inputs/TextInput';
import { useDaoWizardForm } from '../DaoWizardFormProvider';

export const NftAddressInput = () => {
  const {
    formState: { existingNFTAddr, existingNFTLoading, existingNFTError },
    formInput,
  } = useDaoWizardForm();

  return (
    <TextInput
      label="NFT address"
      placeholder="Enter your existing CW721 NFT contract address"
      value={existingNFTAddr}
      error={existingNFTError}
      isLoading={existingNFTLoading}
      onChange={(addr) => {
        formInput({ existingNFTAddr: addr.currentTarget.value });
      }}
    />
  );
};

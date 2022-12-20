import { FormState } from '@terra-money/apps/hooks';
import { validateAddress, validateLength } from '@terra-money/apps/utils';
import { NftMembershipInfo } from 'pages/create-dao/DaoWizardFormProvider';

export const validateNftMembership = ({
  minter,
  nftName,
  nftSymbol,
}: NftMembershipInfo): FormState<NftMembershipInfo> => {
  const formState: FormState<NftMembershipInfo> = { minter, nftName, nftSymbol };

  formState.nftNameError = validateLength(nftName, 3, 140, 'name');
  formState.nftSymbolError = validateLength(nftSymbol, 3, 10, 'symbol');
  if (minter) {
    formState.minterError = validateAddress(minter);
  }

  return formState;
};

import { LabeledValue } from 'lib/ui/LabeledValue';
import { useDaoWizardForm } from '../DaoWizardFormProvider';

export const MembershipReview = () => {
  const {
    formState: { nftMembership },
  } = useDaoWizardForm();

  return (
    <>
      <LabeledValue name="Minter">{nftMembership.minter || '-'}</LabeledValue>
      <LabeledValue name="NFT Name">{nftMembership.nftName || '-'}</LabeledValue>
      <LabeledValue name="NFT Symbol">{nftMembership.nftSymbol || '-'}</LabeledValue>
    </>
  );
};

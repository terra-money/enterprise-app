import { WizardStep } from '../WizardStep';
import { Stack } from '@mui/material';
import { WizardInput } from '../WizardInput';
import { NftMembershipInfo, useDaoWizardForm } from '../DaoWizardFormProvider';

export function NftMembershipStep() {
  const {
    formState: { nftMembership },
    formInput,
  } = useDaoWizardForm();

  const onChange = (params: Partial<NftMembershipInfo>) => {
    formInput({ nftMembership: { ...nftMembership, ...params } });
  };

  return (
    <WizardStep title="Provide NFT details">
      <Stack direction="column" spacing={4}>
        <WizardInput
          label="NFT Name"
          placeholder="Enter the name of your NFT"
          value={nftMembership.nftName}
          error={nftMembership.nftNameError}
          onChange={({ currentTarget }) => onChange({ nftName: currentTarget.value })}
        />
        <WizardInput
          label="NFT Symbol"
          placeholder="Enter the symbol of your NFT"
          value={nftMembership.nftSymbol}
          error={nftMembership.nftSymbolError}
          onChange={({ currentTarget }) => onChange({ nftSymbol: currentTarget.value })}
        />
        <WizardInput
          label="NFT Mint Contract"
          placeholder="Terra contract address"
          value={nftMembership.minter}
          error={nftMembership.minterError}
          onChange={({ currentTarget }) => onChange({ minter: currentTarget.value })}
        />
      </Stack>
    </WizardStep>
  );
}

import { WizardStep } from '../WizardStep';
import { Stack } from '@mui/material';
import { NftMembershipInfo, useDaoWizardForm } from '../DaoWizardFormProvider';
import { TextInput } from 'lib/ui/inputs/TextInput';

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
        <TextInput
          label="NFT Name"
          placeholder="Enter the name of your NFT"
          value={nftMembership.nftName}
          error={nftMembership.nftNameError}
          onValueChange={(nftName) => onChange({ nftName })}
        />
        <TextInput
          label="NFT Symbol"
          placeholder="Enter the symbol of your NFT"
          value={nftMembership.nftSymbol}
          error={nftMembership.nftSymbolError}
          onValueChange={(nftSymbol) => onChange({ nftSymbol })}
        />
        <TextInput
          label="NFT Mint Contract"
          placeholder="Terra contract address"
          value={nftMembership.minter}
          error={nftMembership.minterError}
          onValueChange={(minter) => onChange({ minter })}
        />
      </Stack>
    </WizardStep>
  );
}

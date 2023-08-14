import { WizardStep } from '../WizardStep';
import { NftMembershipInfo, useDaoWizardForm } from '../DaoWizardFormProvider';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { VStack } from 'lib/ui/Stack';

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
      <VStack gap={16}>
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
          label="NFT Minter Address"
          placeholder="Terra wallet address"
          value={nftMembership.minter}
          error={nftMembership.minterError}
          onValueChange={(minter) => onChange({ minter })}
        />
      </VStack>
    </WizardStep>
  );
}

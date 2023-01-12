import { TokenInput } from 'components/token-input';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { VStack } from 'lib/ui/Stack';
import { Token } from 'types/Token';

interface SelectAssetStepProps {
  onSelect: (token: Token) => void;
  onCancel: () => void;
}

export const SelectAssetStep = ({ onSelect, onCancel }: SelectAssetStepProps) => {
  return (
    <>
      <TokenInput onSelect={onSelect} />
      <VStack gap={8}>
        {/* <PrimaryButton>Next</PrimaryButton> */}
        <PrimaryButton kind="secondary" onClick={onCancel}>
          Cancel
        </PrimaryButton>
      </VStack>
    </>
  );
};

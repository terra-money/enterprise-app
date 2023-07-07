import { TokenInput } from 'components/token-input';
import { Button } from 'lib/ui/buttons/Button';
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
        <Button kind="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </VStack>
    </>
  );
};

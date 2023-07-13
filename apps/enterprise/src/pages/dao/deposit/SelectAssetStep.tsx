import { Asset, AssetInfo } from 'chain/Asset';
import { AssetFinder } from 'chain/components/AssetFinder';
import { Button } from 'lib/ui/buttons/Button';
import { VStack } from 'lib/ui/Stack';

interface SelectAssetStepProps {
  onSelect: (asset: Asset & AssetInfo) => void;
  onCancel: () => void;
}

export const SelectAssetStep = ({ onSelect, onCancel }: SelectAssetStepProps) => {
  return (
    <>
      <AssetFinder onSelect={onSelect} />
      <VStack gap={8}>
        <Button kind="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </VStack>
    </>
  );
};

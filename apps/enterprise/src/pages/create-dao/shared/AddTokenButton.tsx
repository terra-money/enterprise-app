import { Asset } from 'chain/Asset';
import { AssetFinder } from 'chain/components/AssetFinder';
import { Modal } from 'lib/ui/Modal';
import { OverlayOpener } from 'lib/ui/OverlayOpener';
import { AddButton } from 'lib/ui/buttons/AddButton';

interface AddTokenButtonProps {
  onSelect: (asset: Asset) => void;
}

export const AddTokenButton = ({ onSelect }: AddTokenButtonProps) => {
  return (
    <OverlayOpener
      renderOverlay={({ onClose }) => (
        <Modal
          placement="top"
          title="Select an asset"
          onClose={onClose}
          renderContent={() => (
            <AssetFinder
              onSelect={(asset) => {
                onSelect(asset);
                onClose();
              }}
            />
          )}
        />
      )}
      renderOpener={({ onOpen }) => <AddButton size="l" onClick={onOpen} />}
    />
  );
};

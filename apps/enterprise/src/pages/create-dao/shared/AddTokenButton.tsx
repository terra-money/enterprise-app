import { Asset } from 'chain/Asset';
import { AssetFinder } from 'chain/components/AssetFinder';
import { AddButton } from 'components/add-button';
import { Modal } from 'lib/ui/Modal';
import { OverlayOpener } from 'lib/ui/OverlayOpener';

interface AddTokenButtonProps {
  onSelect: (asset: Asset) => void;
}

export const AddTokenButton = ({ onSelect }: AddTokenButtonProps) => {
  return (
    <OverlayOpener
      renderOverlay={({ onClose }) => (
        <Modal
          title="Select a token"
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
      renderOpener={({ onOpen }) => <AddButton onClick={onOpen} />}
    />
  );
};

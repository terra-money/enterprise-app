import { AddButton } from 'components/add-button';
import { TokenInput } from 'components/token-input';
import { Modal } from 'lib/ui/Modal';
import { OverlayOpener } from 'lib/ui/OverlayOpener';
import { Token } from 'types';

interface AddTokenButtonProps {
  onSelect: (token: Token) => void;
}

export const AddTokenButton = ({ onSelect }: AddTokenButtonProps) => {
  return (
    <OverlayOpener
      renderOverlay={({ onClose }) => (
        <Modal
          title="Select a token"
          onClose={onClose}
          renderContent={() => (
            <TokenInput
              onSelect={(token) => {
                onSelect(token);
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

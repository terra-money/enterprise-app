import { ConditionalWallet } from 'components/conditional-wallet';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { OverlayOpener } from 'lib/ui/OverlayOpener';
import { ViewMoreNftOverlay } from './ViewMoreNftOverlay';

export const ViewMoreNft = () => {
  return (
    <ConditionalWallet
      connected={() => (
        <OverlayOpener
          renderOpener={({ onOpen }) => (
            <PrimaryButton onClick={onOpen} kind="secondary">
              View More
            </PrimaryButton>
          )}
          renderOverlay={({ onClose }) => <ViewMoreNftOverlay onClose={onClose} />}
        />
      )}
    />
  );
};
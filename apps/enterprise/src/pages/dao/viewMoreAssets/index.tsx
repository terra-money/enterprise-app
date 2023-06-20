import { ConditionalWallet } from 'components/conditional-wallet';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { OverlayOpener } from 'lib/ui/OverlayOpener';
import { ViewMoreAssetsOverlay } from './ViewMoreAssetsOverlay';

export const ViewMoreAssets = () => {
  return (
    <ConditionalWallet
      connected={() => (
        <OverlayOpener
          renderOpener={({ onOpen }) => (
            <PrimaryButton onClick={onOpen} kind="secondary">
              View More
            </PrimaryButton>
          )}
          renderOverlay={({ onClose }) => <ViewMoreAssetsOverlay onClose={onClose} />}
        />
      )}
    />
  );
};

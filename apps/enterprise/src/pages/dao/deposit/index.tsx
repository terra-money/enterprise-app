import { ConditionalWallet } from 'components/conditional-wallet';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { OverlayOpener } from 'lib/ui/OverlayOpener';
import { DepositIntoTreasuryOverlay } from './DepositIntoTreasuryOverlay';

export const DepositIntoTreasury = () => {
  return (
    <ConditionalWallet
      connected={() => (
        <OverlayOpener
          renderOpener={({ onOpen }) => (
            <PrimaryButton onClick={onOpen} kind="secondary">
              Deposit
            </PrimaryButton>
          )}
          renderOverlay={({ onClose }) => <DepositIntoTreasuryOverlay onClose={onClose} />}
        />
      )}
    />
  );
};

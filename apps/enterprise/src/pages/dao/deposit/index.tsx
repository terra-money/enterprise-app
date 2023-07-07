import { ConditionalWallet } from 'components/conditional-wallet';
import { Button } from 'lib/ui/buttons/Button';
import { OverlayOpener } from 'lib/ui/OverlayOpener';
import { DepositIntoTreasuryOverlay } from './DepositIntoTreasuryOverlay';

export const DepositIntoTreasury = () => {
  return (
    <ConditionalWallet
      connected={() => (
        <OverlayOpener
          renderOpener={({ onOpen }) => (
            <Button onClick={onOpen} kind="secondary">
              Deposit
            </Button>
          )}
          renderOverlay={({ onClose }) => <DepositIntoTreasuryOverlay onClose={onClose} />}
        />
      )}
    />
  );
};

import { ConditionalWallet } from 'components/conditional-wallet';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { OverlayOpener } from 'lib/ui/OverlayOpener';
import {DepositNFTIntoTreasuryOverlay} from './DepositNFTIntoTreasuryOverlay'

export const DepositNFTIntoTreasury = () => {
  return (
    <ConditionalWallet
      connected={() => (
        <OverlayOpener
          renderOpener={({ onOpen }) => (
            <PrimaryButton onClick={onOpen} kind="secondary">
              Deposit
            </PrimaryButton>
          )}
          renderOverlay={({ onClose }) => <DepositNFTIntoTreasuryOverlay onClose={onClose} />}
        />
      )}
    />
  );
};
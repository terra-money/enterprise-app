import { ConditionalWallet } from 'components/conditional-wallet';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { OverlayOpener } from 'lib/ui/OverlayOpener';
import { DepositIntoFundsDistributorOverlay } from './DepositIntoFundsDistributorOverlay';

// TODO: reuse the flow with the "Deposit into treasury"
export const DepositIntoFundsDistributor = () => {
  return (
    <ConditionalWallet
      connected={() => (
        <OverlayOpener
          renderOpener={({ onOpen }) => (
            <PrimaryButton onClick={onOpen} kind="secondary">
              Deposit
            </PrimaryButton>
          )}
          renderOverlay={({ onClose }) => <DepositIntoFundsDistributorOverlay onClose={onClose} />}
        />
      )}
    />
  );
};

import { ConditionalWallet } from 'components/conditional-wallet';
import { UpgradeDAOPromptActions } from './UpgradeDAOPromptActions';
import { ConnectWallet } from 'chain/components/ConnectWallet';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';

export const UpgradeDaoActions = () => (
  <ConditionalWallet
    connected={() => <UpgradeDAOPromptActions />}
    notConnected={() => (
      <ConnectWallet
        renderOpener={props => (
          <div {...props}>
            <PrimaryButton kind="primary">
              Connect a wallet
            </PrimaryButton>
          </div>
        )}
      />
    )}
  />
);

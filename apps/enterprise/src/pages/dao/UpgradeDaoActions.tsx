import { ConditionalWallet } from 'components/conditional-wallet';
import { UpgradeDAOPromptActions } from './UpgradeDAOPromptActions';
import { ConnectWallet } from 'chain/components/ConnectWallet';
import { Button } from 'lib/ui/buttons/Button';

export const UpgradeDaoActions = () => (
  <ConditionalWallet
    connected={() => <UpgradeDAOPromptActions />}
    notConnected={() => (
      <ConnectWallet
        renderOpener={(props) => (
          <div {...props}>
            <Button kind="primary">Connect a wallet</Button>
          </div>
        )}
      />
    )}
  />
);

import { WalletButton } from 'chain/components/WalletButton';
import { ConnectedWalletSummary } from './ConnectedWallet/ConnectedWalletSummary';
import { DisconnectWallet } from './ConnectedWallet/DisconnectWallet';
import { VStack } from 'lib/ui/Stack';
import { Menu } from 'lib/ui/Menu';

export const ManageConnectedWallet = () => {
  return (
    <Menu
      title="Manage wallet"
      renderOpener={props => (
        <div {...props}>
          <WalletButton />
        </div>
      )}
      renderContent={() => (
        <VStack gap={32}>
          <ConnectedWalletSummary />
          <DisconnectWallet />
        </VStack>
      )}
    />
  )
};

import { WalletButton } from 'chain/components/WalletButton';
import { ConnectedWalletSummary } from './ConnectedWallet/ConnectedWalletSummary';
import { VStack } from 'lib/ui/Stack';
import { Menu } from 'lib/ui/Menu';
import { MenuOption } from 'lib/ui/Menu/MenuOption';
import { LogOutIcon } from 'lib/ui/icons/LogOutIcon';
import { useWallet } from '@terra-money/wallet-kit';

export const ManageConnectedWallet = () => {
  const { disconnect } = useWallet();

  return (
    <Menu
      title="Manage wallet"
      renderOpener={(props) => (
        <div {...props}>
          <WalletButton />
        </div>
      )}
      renderContent={({ view }) => (
        <VStack gap={8}>
          <ConnectedWalletSummary />
          <MenuOption view={view} icon={<LogOutIcon />} onSelect={disconnect} text="Disconnect wallet" />
        </VStack>
      )}
    />
  );
};

import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useConnectWalletDialog } from 'components/dialog/connect-wallet';
import { WalletButton } from 'chain/components/WalletButton';
import { ManageConnectedWallet } from 'chain/components/ManageConnectedWallet';

export const WalletConnectionButton = () => {
  const connectedWallet = useConnectedWallet();

  const openConnectWalletDialog = useConnectWalletDialog();

  if (connectedWallet) {
    return <ManageConnectedWallet />;
  }

  return <WalletButton onClick={() => openConnectWalletDialog({})} />;
};

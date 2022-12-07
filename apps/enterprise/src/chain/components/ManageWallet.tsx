import { ConditionalWallet } from 'components/conditional-wallet';
import { ConnectWallet } from './ConnectWallet';
import { ManageConnectedWallet } from './ManageConnectedWallet';
import { WalletButton } from './WalletButton';

export const ManageWallet = () => {
  return (
    <ConditionalWallet
      connected={() => <ManageConnectedWallet />}
      notConnected={() => <ConnectWallet renderOpener={({ onClick }) => <WalletButton onClick={onClick} />} />}
    />
  );
};

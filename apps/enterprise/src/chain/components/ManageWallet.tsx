import { ConditionalWallet } from 'components/conditional-wallet';
import { ConnectWallet } from './ConnectWallet';
import { ManageConnectedWallet } from './ManageConnectedWallet';
import { WalletButton } from './WalletButton';

export const ManageWallet = () => {
  return (
    <ConditionalWallet
      connected={() => <ManageConnectedWallet />}
      notConnected={() => <ConnectWallet renderOpener={(props) => (
        <div {...props}>
          <WalletButton />
        </div>
      )} />}
    />
  );
};

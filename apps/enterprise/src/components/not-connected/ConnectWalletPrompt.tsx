import { ConnectWallet } from 'chain/components/ConnectWallet';
import { Panel } from 'components/panel';
import { Text } from 'components/primitives';
import styles from './NotConnected.module.sass';
import { Button } from 'lib/ui/buttons/Button';

export const ConnectWalletPrompt = () => {
  return (
    <Panel className={styles.root}>
      <Text variant="text">Please connect your wallet</Text>
      <ConnectWallet
        renderOpener={(props) => (
          <div {...props}>
            <Button>Connect</Button>
          </div>
        )}
      />
    </Panel>
  );
};

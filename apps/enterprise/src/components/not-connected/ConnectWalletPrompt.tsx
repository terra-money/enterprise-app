import { ConnectWallet } from 'chain/components/ConnectWallet';
import { Panel } from 'components/panel';
import { Text, Button } from 'components/primitives';
import styles from './NotConnected.module.sass';

export const ConnectWalletPrompt = () => {
  return (
    <Panel className={styles.root}>
      <Text variant="text">Please connect your wallet</Text>
      <ConnectWallet
        renderOpener={({ onClick }) => (
          <Button variant="primary" onClick={onClick}>
            Connect
          </Button>
        )}
      />
    </Panel>
  );
};

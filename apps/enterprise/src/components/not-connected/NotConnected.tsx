import { useConnectWalletDialog } from 'components/dialog/connect-wallet';
import { Panel } from 'components/panel';
import { Text, Button } from 'components/primitives';
import styles from './NotConnected.module.sass';

const NotConnected = () => {
  const openConnectWalletDialog = useConnectWalletDialog();

  return (
    <Panel className={styles.root}>
      <Text variant="text">Please connect your wallet</Text>
      <Button variant="primary" onClick={openConnectWalletDialog}>
        Connect
      </Button>
    </Panel>
  );
};

export { NotConnected };

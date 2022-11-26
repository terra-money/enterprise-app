import { Container } from '@terra-money/apps/components';
import { ConnectType, useWallet } from '@terra-money/wallet-provider';
import { Button, Text } from 'components/primitives';
import { useCallback, useMemo } from 'react';
import { ReactComponent as WalletIcon } from 'components/assets/Wallet.svg';
import { useDialog, DialogProps } from '@terra-money/apps/hooks';
import styles from './ConnectWalletDialog.module.sass';

const connectionsMetadata = {
  [ConnectType.EXTENSION]: {
    icon: <WalletIcon />,
  },
  [ConnectType.WALLETCONNECT]: {
    icon: <WalletIcon />,
  },
};

const supportedSet = new Set(Object.keys(connectionsMetadata)) as Set<ConnectType>;

type ConnectWalletDialogProps = {};

export const ConnectWalletDialog = (props: DialogProps<ConnectWalletDialogProps>) => {
  const { closeDialog } = props;
  const { connect, availableConnections } = useWallet();

  const connectWallet = useCallback(
    (connectionType: ConnectType) => {
      connect(connectionType);
      closeDialog(undefined);
    },
    [connect, closeDialog]
  );

  const supportedConnections = useMemo(
    () => availableConnections.filter((c) => supportedSet.has(c.type)),
    [availableConnections]
  );

  return (
    <div className={styles.root}>
      <Text variant="heading1" className={styles.header}>
        Connect your wallet
      </Text>
      <Container className={styles.connections} direction="column">
        {supportedConnections.map((c) => {
          return (
            <Button
              iconGap="large"
              className={styles.connection}
              key={c.type}
              variant="primary"
              iconAlignment="end"
              onClick={() => connectWallet(c.type)}
              icon={<img src={c.icon} alt={c.name} />}
            >
              {c.name}
            </Button>
          );
        })}
      </Container>
    </div>
  );
};

export const useConnectWalletDialog = () => {
  return useDialog<ConnectWalletDialogProps>(ConnectWalletDialog);
};

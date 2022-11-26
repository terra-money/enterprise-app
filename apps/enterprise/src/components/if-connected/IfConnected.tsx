import { useConnectedWallet, useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { NotConnected } from 'components/not-connected';
import { Throbber } from 'components/primitives';
import { ReactNode } from 'react';
import styles from './IfConnected.module.sass';

interface IfConnectedProps {
  then: ReactNode;
  else?: ReactNode;
  hideLoader?: boolean;
}

export const IfConnected = (props: IfConnectedProps) => {
  const { then: thenChildren, else: elseChildren = <NotConnected />, hideLoader } = props;

  const connectedWallet = useConnectedWallet();
  const wallet = useWallet();

  if (wallet.status === WalletStatus.INITIALIZING) {
    return hideLoader ? null : <Throbber className={styles.loading} variant="primary" />;
  }

  return <>{connectedWallet ? thenChildren : elseChildren}</>;
};

import { useConnectedWallet, useWallet, WalletStatus } from '@terra-money/wallet-kit';
import { ReactNode } from 'react';

export interface ConditionalWalletProps {
  connected: () => ReactNode;
  notConnected?: () => ReactNode;
}

export const ConditionalWallet = ({ connected, notConnected }: ConditionalWalletProps) => {
  const { status } = useWallet();
  const connectedWallet = useConnectedWallet();

  if (status === WalletStatus.INITIALIZING) {
    return null;
  }

  if (connectedWallet) {
    return <>{connected()}</>;
  }

  return <>{notConnected?.() || null}</>;
};

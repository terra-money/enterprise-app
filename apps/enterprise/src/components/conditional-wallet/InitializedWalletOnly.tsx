import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { ComponentWithChildrenProps } from 'lib/shared/props';

export const InitizalizedWalletOnly = ({ children }: ComponentWithChildrenProps) => {
  const { status } = useWallet();

  if (status === WalletStatus.INITIALIZING) {
    return null;
  }

  return <>{children}</>;
};

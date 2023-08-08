import { useWallet, WalletStatus } from '@terra-money/wallet-kit';
import { ComponentWithChildrenProps } from 'lib/shared/props';
import { Center } from 'lib/ui/Center';
import { Spinner } from 'lib/ui/Spinner';

export const InitizalizedWalletOnly = ({ children }: ComponentWithChildrenProps) => {
  const { status } = useWallet();

  if (status === WalletStatus.INITIALIZING) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return <>{children}</>;
};

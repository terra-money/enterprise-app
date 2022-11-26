import { useWallet } from '@terra-money/wallet-provider';
import { UIElementProps } from '@terra-money/apps/components';

export const NetworkGuard = (props: UIElementProps) => {
  const { children } = props;

  const { network } = useWallet();

  if (network.name === 'classic') {
    return <div>The Classic network is not supported.</div>;
  }

  return <>{children}</>;
};

import { useWallet } from '@terra-money/wallet-provider';
import { UIElementProps } from '@terra-money/apps/components';
import { useTerraNetwork } from 'chain/hooks/useTerraNetwork';
import { useQueryClient } from 'react-query';
import { useEffect } from 'react';

export const NetworkGuard = (props: UIElementProps) => {
  const { children } = props;

  const { moniker } = useTerraNetwork();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries();
  }, [moniker, queryClient]);

  const { network } = useWallet();

  if (network.name === 'classic') {
    return <div>The Classic network is not supported.</div>;
  }

  return <>{children}</>;
};

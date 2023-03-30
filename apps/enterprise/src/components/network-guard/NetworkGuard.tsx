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


  return <>{children}</>;
};

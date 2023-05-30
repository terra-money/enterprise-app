import { UIElementProps } from '@terra-money/apps/components';
import { useQueryClient } from 'react-query';
import { useEffect } from 'react';
import { supportedChains, useChainID } from '@terra-money/apps/hooks';
import { Center } from 'lib/ui/Center';
import { Text } from 'lib/ui/Text';
import { useConnectedWallet } from "@terra-money/wallet-provider"
import { Spinner } from 'lib/ui/Spinner';

export const NetworkGuard = (props: UIElementProps) => {
  const { children } = props;

  const queryClient = useQueryClient();

  const chainID = useChainID();

  // TODO: This is a hack to fix the issue of the wallet not updating when the network changes.
  const connectedWallet = useConnectedWallet()
  const hasInconsistency = connectedWallet && (!connectedWallet.addresses[chainID] || !connectedWallet.network[chainID])
  useEffect(() => {
    if (hasInconsistency) {
      window.location.reload()
    }
  })

  useEffect(() => {
    queryClient.invalidateQueries();
  }, [chainID, queryClient]);

  if (hasInconsistency) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (!supportedChains.includes(chainID)) {
    return (
      <Center>
        <Text>{chainID} is not supported.</Text>
      </Center>
    );
  }

  return <>{children}</>;
};


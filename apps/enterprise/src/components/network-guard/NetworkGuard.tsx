import { UIElementProps } from '@terra-money/apps/components';
import { useQueryClient } from 'react-query';
import { useEffect } from 'react';
import { supportedChains, useChainID } from '@terra-money/apps/hooks';
import { Center } from 'lib/ui/Center';
import { Text } from 'lib/ui/Text';

export const NetworkGuard = (props: UIElementProps) => {
  const { children } = props;

  const queryClient = useQueryClient();

  const chainID = useChainID();

  useEffect(() => {
    queryClient.invalidateQueries();
  }, [chainID, queryClient]);

  if (!supportedChains.includes(chainID)) {
    return (
      <Center>
        <Text>{chainID} is not supported.</Text>
      </Center>
    );
  }

  return <>{children}</>;
};

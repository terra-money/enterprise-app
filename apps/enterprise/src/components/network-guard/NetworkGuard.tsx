import { useQueryClient } from 'react-query';
import { useEffect } from 'react';
import { Center } from 'lib/ui/Center';
import { Text } from 'lib/ui/Text';
import { ComponentWithChildrenProps } from 'lib/shared/props';
import { supportedChains, useChainID } from 'chain/hooks/useChainID';

export const NetworkGuard = (props: ComponentWithChildrenProps) => {
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

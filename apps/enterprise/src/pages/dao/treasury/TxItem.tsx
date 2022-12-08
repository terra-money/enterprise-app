import { useCallback } from 'react';
import { useWallet } from '@terra-money/wallet-provider';
import { Button, Text } from 'components/primitives';
import { getFinderUrl, truncateAddress } from '@terra-money/apps/utils';
import { TxResponse } from '@terra-money/apps/types';
import { Panel } from 'lib/ui/Panel/Panel';
import { HStack } from 'lib/ui/Stack';

interface TxItemProps {
  tx: TxResponse;
}

export const TxItem = (props: TxItemProps) => {
  const { tx } = props;
  const { txhash, timestamp } = tx;
  const { network } = useWallet();

  const onDetailsClick = useCallback(() => {
    window.open(getFinderUrl(network.name, txhash));
  }, [network, txhash]);

  return (
    <Panel>
      <HStack gap={16} alignItems="center" justifyContent="space-between" wrap="wrap">
        <Text variant="button" onClick={onDetailsClick}>
          {truncateAddress(txhash, [10, 10])}
        </Text>
        <Text variant="label">
          {new Date(timestamp).toLocaleString('en-US', {
            weekday: 'short',
            day: 'numeric',
            year: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </Text>
        <Button onClick={onDetailsClick}>Details</Button>
      </HStack>
    </Panel>
  );
};

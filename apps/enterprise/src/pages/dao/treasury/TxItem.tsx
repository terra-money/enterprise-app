import { useCallback } from 'react';
import { useWallet } from '@terra-money/wallet-provider';
import { Button, Text } from 'components/primitives';
import { getFinderUrl, truncateAddress } from '@terra-money/apps/utils';
import { TxEvent, TxResponse } from '@terra-money/apps/types';
import { Container } from '@terra-money/apps/components';
import { ExpandablePanel } from 'lib/ui/Panel/ExpandablePanel';

interface TxItemProps {
  tx: TxResponse;
}

export const TxItem = (props: TxItemProps) => {
  const { tx } = props;
  const { txhash, timestamp, logs } = tx;
  const { network } = useWallet();

  const events: TxEvent[] = logs ? logs[0].events : [];


  const attributes = events?.flatMap(event => event.attributes);



  const onDetailsClick = useCallback(() => {
    window.open(getFinderUrl(network.name, txhash));
  }, [network, txhash]);

  const header = (
    <>
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
      <Button onClick={onDetailsClick}>Details</Button></>
  )

  const transactionDetials = (
    <>
      {attributes.map((attribute, attributeIndex) => (
        <Container key={`${attribute.key}-${attributeIndex}`} direction="row" gap={16}>
          <Text variant="label">Message: {attribute.key}</Text>
          <Text variant="label">Value: {attribute.value}</Text>
        </Container>
      ))
      }
    </>
  );

  return (
    <ExpandablePanel header={header} renderContent={() => (transactionDetials)}>
    </ExpandablePanel>
  );
};

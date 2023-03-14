import { useWallet } from '@terra-money/wallet-provider';
import { getFinderUrl, truncateAddress } from '@terra-money/apps/utils';
import { TxEvent, TxResponse } from '@terra-money/apps/types';
import { Container } from '@terra-money/apps/components';
import { ExpandablePanel } from 'lib/ui/Panel/ExpandablePanel';
import { ExternalLink } from 'lib/navigation/Link/ExternalLink';
import { Text } from 'lib/ui/Text';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { HStack } from 'lib/ui/Stack';
import { TimeAgo } from 'lib/ui/TimeAgo';

interface TxItemProps {
  tx: TxResponse;
}

export const TxItem = (props: TxItemProps) => {
  const { tx } = props;
  const { txhash, timestamp, logs } = tx;
  const { network } = useWallet();
  console.log(timestamp)

  const events: TxEvent[] = logs ? logs[0].events : [];

  const attributes = events?.flatMap(event => event.attributes);

  const header = (
    <HStack fullWidth gap={20} wrap="wrap" justifyContent="space-between">
      <ExternalLink to={getFinderUrl(network.name, txhash)}>
        <ShyTextButton as="div" text={truncateAddress(txhash)} />
      </ExternalLink>
      <Text color="supporting" size={14}>
        <TimeAgo value={new Date(timestamp)} />
      </Text>
    </HStack>
  )

  const transactionDetials = (
    <>
      {attributes.map((attribute, attributeIndex) => (
        <Container key={`${attribute.key}-${attributeIndex}`} direction="row" gap={16}>
          <Text>Message: {attribute.key}</Text>
          <Text>Value: {attribute.value}</Text>
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

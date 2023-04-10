import { useWallet } from '@terra-money/wallet-provider';
import { assertDefined, getFinderUrl, getLast, truncateAddress } from '@terra-money/apps/utils';
import { TxEvent, TxResponse } from '@terra-money/apps/types';
import { Container } from '@terra-money/apps/components';
import { ExpandablePanel } from 'lib/ui/Panel/ExpandablePanel';
import { ExternalLink } from 'lib/navigation/Link/ExternalLink';
import { Text } from 'lib/ui/Text';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { HStack } from 'lib/ui/Stack';
import { TimeAgo } from 'lib/ui/TimeAgo';
import {
  createActionRuleSet,
  createLogMatcherForActions,
  getTxCanonicalMsgs,
} from "@terra-money/log-finder-ruleset"
import { ErrorBoundary } from 'errors/components/ErrorBoundary';
import { useTheme } from 'styled-components';
import { Tag } from 'lib/ui/Tag';
import { capitalizeFirstLetter } from 'lib/shared/utils/capitalizeFirstLetter';
import { TxMessage } from './TxMessage';
import { useCurrentDaoAddress } from 'dao/navigation';

interface TxItemProps {
  tx: TxResponse;
}

export const TxItem = (props: TxItemProps) => {
  const { tx } = props;
  const { txhash, timestamp, logs } = tx;
  const { network } = useWallet();

  const address = useCurrentDaoAddress()

  const events: TxEvent[] = logs ? logs[0].events : [];

  const attributes = events?.flatMap(event => event.attributes);

  const ruleset = createActionRuleSet(network.name)
  const logMatcher = createLogMatcherForActions(ruleset)
  const getCanonicalMsgs = (txInfo: TxResponse) => {
    const matchedMsg = getTxCanonicalMsgs(txInfo, logMatcher)
    return matchedMsg
      ? matchedMsg
        .map((matchedLog) => matchedLog.map(({ transformed }) => transformed))
        .flat(2)
      : []
  }

  const isSuccess = tx.code === 0

  const { colors } = useTheme()

  const header = (
    <HStack fullWidth gap={20} wrap="wrap" justifyContent="space-between">
      <HStack alignItems="center" gap={16}>
        <ExternalLink to={getFinderUrl(network.name, txhash)}>
          <ShyTextButton as="div" text={truncateAddress(txhash)} />
        </ExternalLink>
        <ErrorBoundary>
          {getCanonicalMsgs(tx).filter(msg => msg).map(
            (msg, index) => {
              const { msgType, canonicalMsg } = assertDefined(msg)
              const type = getLast(msgType.split("/"))

              return (
                <HStack alignItems="center" gap={8}>
                  <Tag color={isSuccess ? colors.success : colors.alert}>
                    {capitalizeFirstLetter(type)}
                  </Tag>
                  {canonicalMsg.map((text, index) => (
                    <TxMessage targetAddress={address} text={text} key={index} />
                  ))}
                </HStack>
              )
            }
          )}
        </ErrorBoundary>
      </HStack>
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

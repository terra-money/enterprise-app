import { useCallback } from 'react';
import classNames from 'classnames';
import { useWallet } from '@terra-money/wallet-provider';
import { Container } from '@terra-money/apps/components';
import { Button, Text } from 'components/primitives';
import { Panel } from 'components/panel';
import { getFinderUrl, truncateAddress } from '@terra-money/apps/utils';
import { TxResponse } from '@terra-money/apps/types';
import styles from './TxItem.module.sass';

interface TxItemProps {
  className?: string;
  tx: TxResponse;
}

export const TxItem = (props: TxItemProps) => {
  const { className, tx } = props;
  const { txhash, timestamp } = tx;
  const { network } = useWallet();

  const onDetailsClick = useCallback(() => {
    window.open(getFinderUrl(network.name, txhash));
  }, [network, txhash]);

  return (
    <Panel className={classNames(className, styles.root)}>
      <Container className={styles.row}>
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
      </Container>
    </Panel>
  );
};

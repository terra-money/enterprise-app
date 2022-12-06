import { AnimateNumber, Container } from '@terra-money/apps/components';
import { demicrofy } from '@terra-money/apps/libs/formatting';
import { LUNA, u } from '@terra-money/apps/types';
import { useConnectedWallet, useWallet } from '@terra-money/wallet-provider';
import Big from 'big.js';
import { Address } from 'components/address';
import { FriendlyFormatter } from 'components/numeric-panel';
import { Button, Text } from 'components/primitives';
import { useNativeBalanceQuery } from 'queries';
import styles from './ConnectedWallet.module.sass';

// TODO: migrage to styled-components
export const ConnectedWallet = () => {
  const connectedWallet = useConnectedWallet();

  const { data: balance = Big(0) as u<Big> } = useNativeBalanceQuery();

  const { disconnect } = useWallet();

  return (
    <Container className={styles.root} direction="column">
      <Address address={connectedWallet?.walletAddress} />
      <Text className={styles.balance} variant="heading4">
        <AnimateNumber format={(v) => FriendlyFormatter(v, 2)}>{demicrofy(balance, LUNA.decimals)}</AnimateNumber>
        <span className={styles.label}>LUNA</span>
      </Text>
      <Button
        className={styles.disconnect}
        onClick={() => {
          disconnect();
        }}
      >
        Disconnect wallet
      </Button>
    </Container>
  );
};

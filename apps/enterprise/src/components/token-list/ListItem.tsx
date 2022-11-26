import { Text } from 'components/primitives';
import { ListChildComponentProps } from 'react-window';
import { TokenIcon } from 'components/token-icon';
import { useTokenBalanceQuery } from 'queries';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { TokenBalance } from './TokenBalance';
import { ListData } from './ListData';
import styles from './ListItem.module.sass';

export const ListItem = (props: ListChildComponentProps<ListData>) => {
  const {
    index,
    style,
    data: { tokens, onSelectionChanged },
  } = props;

  const token = tokens[index];

  const connectedWallet = useConnectedWallet();

  const { data: balance } = useTokenBalanceQuery(connectedWallet?.walletAddress!, token);

  return (
    <div key={token.symbol} className={styles.listItem} style={style} onClick={() => onSelectionChanged(token)}>
      <TokenIcon className={styles.icon} symbol={token.symbol} path={token.icon} />
      <Text className={styles.symbol} variant="text" weight="bold">
        {token.symbol}
      </Text>
      <Text className={styles.name} variant="text">
        {token.name}
      </Text>
      {balance && <TokenBalance className={styles.balance} balance={balance} decimals={token.decimals} />}
    </div>
  );
};

import { Text } from 'components/primitives';
import { TokenIcon } from 'components/token-icon';
import { TokenBalance } from './TokenBalance';
import styles from './ListItem.module.sass';
import { Token } from 'types';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { useAssetBalanceQury } from 'chain/hooks/useAssetBalanceQuery';

interface Props {
  token: Token;
  onSelect: () => void;
}

export const ListItem = ({ token, onSelect }: Props) => {
  const address = useAssertMyAddress();

  const { data: balance } = useAssetBalanceQury({
    address,
    asset: {
      type: token.type === 'cw20' ? 'cw20' : 'native',
      id: token.key,
    },
  });

  return (
    <div key={token.symbol} className={styles.listItem} onClick={onSelect}>
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

import Big from 'big.js';
import classNames from 'classnames';
import { Text } from 'components/primitives';
import styles from './TokenBalance.module.sass';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';

interface TokenBalanceProps {
  className: string;
  balance: string;
  decimals: number;
}

export const TokenBalance = (props: TokenBalanceProps) => {
  const { className, balance, decimals } = props;

  const formattedAmount =
    balance === undefined || Big(balance).lte(0)
      ? ''
      : formatAmount(fromChainAmount(Big(balance).toNumber(), decimals), {
          decimals: 4,
        });

  return (
    <Text className={classNames(className, styles.root)} variant="text">
      {formattedAmount}
    </Text>
  );
};

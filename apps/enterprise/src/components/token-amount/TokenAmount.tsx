import { Text, TextProps } from 'components/primitives';
import Big, { BigSource } from 'big.js';
import { u, Token } from '@terra-money/apps/types';
import classNames from 'classnames';
import { TokenIcon } from 'components/token-icon';
import { Container } from '@terra-money/apps/components';
import { usePrice } from '@terra-money/apps/hooks';
import styles from './TokenAmount.module.sass';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { fromChainAmount } from 'chain/utils/fromChainAmount';

interface TokenAmountProps extends Pick<TextProps, 'variant' | 'component'> {
  className?: string;
  token: Token;
  amount: u<BigSource>;
  decimals?: number;
  showSymbol?: boolean;
  showIcon?: boolean;
  showUsdAmount?: boolean;
}

export const TokenAmount = (props: TokenAmountProps) => {
  const {
    className,
    variant,
    component,
    token,
    amount,
    decimals,
    showSymbol = true,
    showIcon = false,
    showUsdAmount = false,
  } = props;

  const formattingOptions = {
    decimals: decimals ?? token.decimals ?? 2,
  };

  const formattedAmount = formatAmount(fromChainAmount(Big(amount).toNumber(), token.decimals ?? 6), formattingOptions);

  const priceUsd = usePrice(token);

  const formattedUsdAmount = formatAmount(
    priceUsd ? fromChainAmount(Big(amount).toNumber(), token.decimals ?? 6) * priceUsd.toNumber() : 0,
    {
      decimals: 2,
    }
  );

  return (
    <Container className={styles.container} direction="row">
      <Text className={classNames(className, styles.root)} variant={variant} component={component}>
        {formattedAmount}
        {showIcon === false && showSymbol && token.symbol && <sub>{token.symbol}</sub>}
        {showIcon && token && (
          <TokenIcon className={styles.icon} variant="inset" symbol={token.symbol} path={token.icon} />
        )}
      </Text>
      {showUsdAmount && (
        <Text variant="label" className={styles.usd_amount}>
          (${formattedUsdAmount})
        </Text>
      )}
    </Container>
  );
};

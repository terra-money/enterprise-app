import { Text, TextProps } from 'components/primitives';
import { BigSource } from 'big.js';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import classNames from 'classnames';
import { NoMicro } from '@terra-money/apps/types';
import styles from './FiatAmount.module.sass';

interface FiatAmountProps extends Pick<TextProps, 'variant' | 'component'> {
  className: string;
  decimals?: number;
  amount: BigSource & NoMicro;
}

export const FiatAmount = (props: FiatAmountProps) => {
  const { className, variant, component, amount, decimals } = props;

  const formattingOptions = {
    decimals: decimals ?? 2,
  };

  const formattedAmount = formatAmount(amount, formattingOptions);

  return (
    <Text className={classNames(className, styles.root)} variant={variant} component={component}>
      <sub>$</sub>
      {formattedAmount}
    </Text>
  );
};

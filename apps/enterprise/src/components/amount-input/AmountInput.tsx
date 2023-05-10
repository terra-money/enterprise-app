import { InputAdornment } from '@mui/material';
import Big from 'big.js';
import { NumericInput, NumericInputProps, Throbber, Text } from 'components/primitives';
import { ReactComponent as CheckIcon } from 'components/assets/Check.svg';
import { Action } from 'types';
import styles from './AmountInput.module.sass';
import classNames from 'classnames';
import { formatAmount } from '@terra-money/apps/libs/formatting';

interface AmountInputProps extends NumericInputProps {
  valid?: boolean;
  maxAmount?: Big;
  maxLoading?: boolean;
  symbol?: string;
  onMaxClick?: Action<void>;
}

export const AmountInput = (props: AmountInputProps) => {
  const {
    className,
    value,
    valid,
    maxAmount,
    maxLoading,
    onMaxClick,
    symbol = '',
    placeholder = 'Enter an amount',
    ...rest
  } = props;

  const formattedMaxAmount =
    maxAmount &&
    formatAmount(maxAmount, {
      decimals: 2,
    });

  const endAdornment = (
    <InputAdornment position="end">
      {!maxLoading && formattedMaxAmount && (
        <Text
          className={styles.maxAmount}
          onClick={() => onMaxClick && onMaxClick()}
          variant="label"
        >{`${formattedMaxAmount} ${symbol}`}</Text>
      )}
      {maxLoading && <Throbber size="small" variant="secondary" />}
      {valid && <CheckIcon className={styles.check} />}
    </InputAdornment>
  );

  return (
    <NumericInput
      {...rest}
      className={classNames(className, styles.root)}
      placeholder={placeholder}
      value={value}
      endAdornment={endAdornment}
    />
  );
};

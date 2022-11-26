import classNames from 'classnames';
import { TextInput, TextInputProps } from '../text-input';
import { useRestrictedNumericInput, RestrictedNumberInputProps } from './useRestrictedNumericInput';

export type NumericInputProps = Omit<TextInputProps, 'type'> & RestrictedNumberInputProps;

const NumericInput = (props: NumericInputProps) => {
  const {
    className,
    type = 'decimal',
    maxDecimalPoints,
    maxIntegerPoints,
    onChange,
    inputMode = type === 'decimal' ? 'decimal' : 'numeric',
    ...rest
  } = props;

  const handlers = useRestrictedNumericInput({
    type,
    maxIntegerPoints,
    maxDecimalPoints,
    onChange,
  });

  return (
    <TextInput
      {...rest}
      className={classNames(className)}
      autoComplete="off"
      type="text"
      inputProps={{
        inputMode,
        pattern: '[0-9.]*',
      }}
      {...handlers}
    />
  );
};

export { NumericInput };

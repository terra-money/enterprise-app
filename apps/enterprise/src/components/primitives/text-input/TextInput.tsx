import { OutlinedInput, OutlinedInputProps } from '@mui/material';
import classNames from 'classnames';
import styles from './TextInput.module.sass';
import { TextInputHelperText } from './TextInputHelperText';

export interface TextInputProps extends OutlinedInputProps {
  helperText?: string | undefined;
  onValueChange?: (value: string) => void;
}

const TextInput = (props: TextInputProps) => {
  const { className, helperText, error, onChange, onValueChange, ...rest } = props;

  return (
    <>
      <OutlinedInput
        {...rest}
        className={classNames(className, styles.root)}
        error={error}
        autoComplete="off"
        onChange={(...args) => {
          onChange?.(...args);
          onValueChange?.(args[0].currentTarget.value);
        }}
      />
      {helperText && <TextInputHelperText error={error}>{helperText}</TextInputHelperText>}
    </>
  );
};

export { TextInput };

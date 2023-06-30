import { TextInput, TextInputProps, Throbber, useFocusedInput } from 'components/primitives';
import InputAdornment from '@mui/material/InputAdornment';
import { ReactComponent as CheckIcon } from 'components/assets/Check.svg';
import { ReactComponent as ErrorIcon } from 'components/assets/Error.svg';
import classNames from 'classnames';
import styles from './FormTextInput.module.sass';
import { Tooltip } from 'lib/ui/Tooltip';

export interface FormTextInputProps extends Omit<TextInputProps, 'error'> {
  error?: string;
  valid?: boolean;
  loading?: boolean;
}

export const FormTextInput = (props: FormTextInputProps) => {
  const { className, error, valid, loading, ...rest } = props;

  const { focused, ...handlers } = useFocusedInput();

  return (
    <TextInput
      className={classNames(className, styles.root)}
      error={error !== undefined}
      endAdornment={
        <InputAdornment className={styles.adornment} position="end">
          {loading ? (
            <Throbber className={styles.throbber} size="small" variant="secondary" />
          ) : (
            <>
              {valid && <CheckIcon className={styles.check} />}
              {error && (
                <Tooltip content={error} renderOpener={(props) => <ErrorIcon {...props} className={styles.error} />} />
              )}
            </>
          )}
        </InputAdornment>
      }
      {...handlers}
      {...rest}
    />
  );
};

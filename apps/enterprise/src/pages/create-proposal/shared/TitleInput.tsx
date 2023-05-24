import { InputAdornment } from '@mui/material';
import classNames from 'classnames';
import { FormControl } from 'components/form-control/FormControl';
import { ReactComponent as ErrorIcon } from 'components/assets/Error.svg';
import { Text, Tooltip, useFocusedInput } from 'components/primitives';
import React, { useCallback } from 'react';
import { FormTextInput } from 'components/form-text-input';
import styles from './TitleInput.module.sass';

interface TitleInputProps {
  className?: string;
  label: string;
  error?: string;
  value?: string;
  onChange: (value?: string) => void;
}

export const TitleInput = (props: TitleInputProps) => {
  const { className, label, error, value, onChange } = props;

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (value) => onChange(value.target.value),
    [onChange]
  );

  const { focused, ...handlers } = useFocusedInput();

  return (
    <FormControl className={classNames(className, styles.root)} label={label}>
      <FormTextInput
        className={styles.input}
        placeholder="Enter a title"
        margin="none"
        value={value}
        onChange={handleChange}
        error={error}
        {...handlers}
        endAdornment={
          <>
            {error && (
              <InputAdornment position="end">
                <Tooltip open={focused} title={error} arrow={true} placement="top" variant="error">
                  <ErrorIcon className={styles.error} />
                </Tooltip>
              </InputAdornment>
            )}
            {error === undefined && (
              <InputAdornment position="end">
                {value && value.length > 0 && <Text variant="label">{`${value?.length ?? 0}/140`}</Text>}
              </InputAdornment>
            )}
          </>
        }
      />
    </FormControl>
  );
};

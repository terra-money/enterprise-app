import { InputAdornment } from '@mui/material';
import classNames from 'classnames';
import { FormControl } from 'components/form-control/FormControl';
import { Text, Tooltip, useFocusedInput } from 'components/primitives';
import { ReactComponent as ErrorIcon } from 'components/assets/Error.svg';
import React, { useCallback, useEffect, useState } from 'react';
import { FormTextInput } from 'components/form-text-input';
import styles from './DescriptionInput.module.sass';

interface DescriptionInputProps {
  className?: string;
  label: string;
  error?: string;
  value?: string;
  onChange: (value?: string) => void;
}

export const DescriptionInput = (props: DescriptionInputProps) => {
  const { className, label, error, value: initialValue, onChange } = props;
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    if (!value || value.length === 0) {
      setValue(initialValue);
    }
  }, [initialValue, value]);
  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setValue(event.target.value); // Update local state
      onChange(event.target.value);
    },
    [onChange]
  );

  const { focused, ...handlers } = useFocusedInput();

  return (
    <FormControl className={classNames(className, styles.root)} label={label}>
      <FormTextInput
        placeholder="Enter a description"
        multiline={true}
        margin="none"
        value={value}
        inputProps={{
          className: styles.input,
        }}
        onChange={handleChange}
        error={error}
        {...handlers}
        endAdornment={
          <>
            {error && (
              <InputAdornment className={styles.adornment} position="end">
                <Tooltip open={focused} title={error} arrow={true} placement="top" variant="error">
                  <ErrorIcon className={styles.error} />
                </Tooltip>
              </InputAdornment>
            )}
            {error === undefined && (
              <InputAdornment className={styles.adornment} position="end">
                {value && value.length > 0 && <Text variant="label">{`${value?.length ?? 0}/2000`}</Text>}
              </InputAdornment>
            )}
          </>
        }
      />
    </FormControl>
  );
};

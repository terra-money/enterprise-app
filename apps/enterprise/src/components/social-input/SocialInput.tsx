import styles from './SocialInput.module.sass';
import InputAdornment from '@mui/material/InputAdornment';
import { ReactNode } from 'react';
import { FormTextInput, FormTextInputProps } from 'components/form-text-input';

export interface SocialInputProps extends FormTextInputProps {
  icon: ReactNode;
}

export const SocialInput = (props: SocialInputProps) => {
  const { icon, ...rest } = props;
  return (
    <FormTextInput
      startAdornment={
        <InputAdornment className={styles.socialIcon} position="start">
          {icon}
        </InputAdornment>
      }
      className={styles.input}
      {...rest}
    />
  );
};

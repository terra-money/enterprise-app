import { FormHelperTextProps, FormHelperText } from '@mui/material';
import styles from './TextInput.module.sass';

export interface TextInputHelperTextProps extends FormHelperTextProps {}

const TextInputHelperText = (props: TextInputHelperTextProps) => {
  return <FormHelperText {...props} className={styles.helperText} />;
};

export { TextInputHelperText };

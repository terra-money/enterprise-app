import { Select, SelectProps } from '@mui/material';
import classNames from 'classnames';
import styles from './SelectInput.module.sass';

export interface SelectInputProps<T = unknown> extends SelectProps<T> {}

const SelectInput = <T,>(props: SelectInputProps<T>) => {
  const { className, MenuProps, inputProps, ...rest } = props;
  return (
    <Select<T>
      className={classNames(className, styles.root)}
      variant="outlined"
      classes={{
        icon: styles.icon,
      }}
      MenuProps={{
        classes: {
          root: styles.menu,
        },
        disableAutoFocusItem: true,
        ...MenuProps,
      }}
      inputProps={{
        ...inputProps,
      }}
      {...rest}
    />
  );
};

interface PlaceholderProps {
  label: string;
}

const Placeholder = (props: PlaceholderProps) => {
  const { label } = props;
  return <span className={styles.placeholder}>{label}</span>;
};

export { SelectInput, Placeholder };

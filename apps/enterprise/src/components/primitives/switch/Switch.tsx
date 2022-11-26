import { Switch as MuiSwitch, SwitchProps as MuiSwitchProps } from '@mui/material';
import classNames from 'classnames';
import styles from './Switch.module.sass';

interface SwitchProps extends MuiSwitchProps {}

const Switch = (props: SwitchProps) => {
  const { className, ...rest } = props;
  return <MuiSwitch className={classNames(styles.root, className)} {...rest} />;
};

export { Switch };

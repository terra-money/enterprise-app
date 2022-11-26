import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from '@mui/material';
import classNames from 'classnames';
import styles from './Tooltip.module.sass';

type Variant = 'normal' | 'error';

interface TooltipProps extends MuiTooltipProps {
  variant?: Variant;
}

export const Tooltip = (props: TooltipProps) => {
  const { variant = 'normal', ...rest } = props;

  return (
    <MuiTooltip
      classes={{
        popper: classNames(styles.popper, styles[variant]),
      }}
      {...rest}
    />
  );
};

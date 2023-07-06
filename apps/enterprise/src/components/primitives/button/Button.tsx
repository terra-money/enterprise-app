import classNames from 'classnames';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.sass';
import { Spinner } from 'lib/ui/Spinner';

type Variant = 'primary' | 'secondary' | 'danger';

type Gutters = 'none' | 'small' | 'large';

type IconGap = 'small' | 'large' | 'none';

type IconAlignment = 'start' | 'end';

type ComponentName = 'button' | 'div';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement & HTMLDivElement> {
  variant?: Variant;
  gutters?: Gutters;
  icon?: ReactNode;
  disabled?: boolean;
  iconGap?: IconGap;
  iconAlignment?: IconAlignment;
  loading?: boolean;
  component?: ComponentName;
}

const Button = forwardRef<any, ButtonProps>((props, ref) => {
  const {
    className,
    children,
    variant = 'secondary',
    gutters = 'small',
    icon,
    iconGap = 'small',
    iconAlignment = 'start',
    loading,
    component = 'button',
    ...rest
  } = props;

  const Component = component;

  return (
    <Component
      ref={ref}
      className={classNames(
        className,
        styles.root,
        styles[variant],
        gutters === 'small' ? styles.guttersSmall : null,
        gutters === 'large' ? styles.guttersLarge : null,
        icon && iconAlignment === 'start' ? styles.iconAlignmentStart : null,
        icon && iconAlignment === 'end' ? styles.iconAlignmentEnd : null,
        icon && iconGap === 'small' ? styles.iconGapSmall : null,
        icon && iconGap === 'large' ? styles.iconGapLarge : null
      )}
      {...rest}
    >
      {loading === undefined || loading === false ? (
        <>
          {icon && iconAlignment === 'start' ? icon : null}
          <span className={styles.content}>{children}</span>
          {icon && iconAlignment === 'end' ? icon : null}
        </>
      ) : (
        <Spinner />
      )}
    </Component>
  );
});

export { Button };

import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';
import styles from './IconButton.module.sass';
import { Spinner } from 'lib/ui/Spinner';

type Variant = 'primary' | 'secondary' | 'outline';

type Size = 'small' | 'large';

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
}

const IconButton = forwardRef<any, IconButtonProps>((props, ref) => {
  const { className, children, variant = 'secondary', size = 'small', loading = false, ...rest } = props;

  return (
    <button
      ref={ref}
      className={classNames(
        className,
        styles.root,
        styles[variant],
        size === 'small' ? styles.small : null,
        size === 'large' ? styles.large : null
      )}
      {...rest}
    >
      {loading === true ? <Spinner /> : children}
    </button>
  );
});

export { IconButton };

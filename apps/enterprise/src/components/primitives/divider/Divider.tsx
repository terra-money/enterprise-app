import classNames from 'classnames';
import styles from './Divider.module.sass';

type Variant = 'primary' | 'secondary';

interface DividerProps {
  className?: string;
  variant?: Variant;
}

export const Divider = (props: DividerProps) => {
  const { className, variant = 'primary' } = props;

  return <hr className={classNames(styles.root, className)} data-variant={variant} />;
};

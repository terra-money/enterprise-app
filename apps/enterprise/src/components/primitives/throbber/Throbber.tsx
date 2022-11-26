import classNames from 'classnames';
import { UIElementProps } from '@terra-money/apps/components';
import styles from './Throbber.module.sass';

type ThrobberVariant = 'primary' | 'secondary' | 'error';

type ThrobberSize = 'small' | 'large';

type ThrobberProps = UIElementProps & {
  variant?: ThrobberVariant;
  size?: ThrobberSize;
  dotClassName?: string;
};

const Throbber = (props: ThrobberProps) => {
  const { className, dotClassName, variant = 'primary', size = 'large' } = props;
  return (
    <div className={classNames(className, styles.root)} data-size={size}>
      <div className={classNames(styles.dot, styles[variant], styles[size], dotClassName)} />
      <div className={classNames(styles.dot, styles[variant], styles[size], dotClassName)} />
      <div className={classNames(styles.dot, styles[variant], styles[size], dotClassName)} />
    </div>
  );
};

export { Throbber };

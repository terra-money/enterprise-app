import { UIElementProps } from '@terra-money/apps/components';
import classNames from 'classnames';
import styles from './Form.module.sass';

export const Form = (props: UIElementProps) => {
  const { children, className } = props;

  return (
    <form className={classNames(styles.root, className)} onSubmit={(e) => e.preventDefault()}>
      {children}
    </form>
  );
};

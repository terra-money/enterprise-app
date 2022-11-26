import classNames from 'classnames';
import styles from './UnstyledButton.module.sass';

export interface UnstyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const UnstyledButton = ({ className, children, ...props }: UnstyledButtonProps) => {
  return (
    <button className={classNames(styles.root, className)} {...props}>
      {children}
    </button>
  );
};

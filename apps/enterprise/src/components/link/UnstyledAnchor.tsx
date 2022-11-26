import classNames from 'classnames';
import styles from './UnstyledAnchor.module.sass';

export interface UnstyledAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const UnstyledAnchor = ({ className, children, ...props }: UnstyledAnchorProps) => {
  return (
    <a className={classNames(styles.root, className)} {...props}>
      {children}
    </a>
  );
};

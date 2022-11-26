import { UIElementProps } from '@terra-money/apps/components';
import classNames from 'classnames';
import styles from './Menu.module.sass';

export const Menu = (props: UIElementProps) => {
  const { children, style, className } = props;

  return (
    <div className={classNames(styles.menu, className)} style={style}>
      <div className={styles.menu_content}>{children}</div>
    </div>
  );
};

export const MenuItem = (props: UIElementProps & { onClick?: () => void }) => {
  const { children } = props;

  return (
    <div {...props} className={classNames(styles.menu_item, props.className)}>
      {children}
    </div>
  );
};

import classNames from 'classnames';
import { UIElementProps } from '@terra-money/apps/components';
import styles from './DialogFooter.module.sass';

interface DialogFooterProps extends UIElementProps {}

export const DialogFooter = (props: DialogFooterProps) => {
  const { className, children } = props;
  return <div className={classNames(className, styles.root)}>{children}</div>;
};

import { UIElementProps } from '@terra-money/apps/components';
import classNames from 'classnames';
import { forwardRef, Ref } from 'react';
import styles from './LandingPageSlice.module.sass';

export const LandingPageSlice = forwardRef((props: UIElementProps, ref: Ref<HTMLDivElement>) => {
  const { children, className } = props;
  return (
    <div ref={ref} className={classNames(styles.root, className)}>
      {children}
    </div>
  );
});

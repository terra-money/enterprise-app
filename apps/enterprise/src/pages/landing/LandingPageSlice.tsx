import classNames from 'classnames';
import { forwardRef, Ref } from 'react';
import styles from './LandingPageSlice.module.sass';
import { ComponentWithChildrenProps } from 'lib/shared/props';

interface LandingPageSliceProps extends ComponentWithChildrenProps {
  className?: string;
}

export const LandingPageSlice = forwardRef((props: LandingPageSliceProps, ref: Ref<HTMLDivElement>) => {
  const { children, className } = props;
  return (
    <div ref={ref} className={classNames(styles.root, className)}>
      {children}
    </div>
  );
});

import { Logo } from 'components/layout/Logo';
import { forwardRef, Ref } from 'react';
import { LandingPageSlice } from './LandingPageSlice';
import { PrimaryNavigation } from './PrimaryNavigation';
import classNames from 'classnames';
import styles from './LandingTopbar.module.sass';

interface LandingTopbarProps {
  className?: string;
}

export const LandingTopbar = forwardRef((props: LandingTopbarProps, ref: Ref<HTMLDivElement>) => {
  const { className } = props;

  return (
    <LandingPageSlice ref={ref} className={classNames(className, styles.root)}>
      <Logo />
      <PrimaryNavigation className={styles.navigation} />
    </LandingPageSlice>
  );
});

import { Logo } from 'components/layout/Logo';
import { forwardRef, Ref } from 'react';
import { LandingPageSlice } from './LandingPageSlice';
import classNames from 'classnames';
import styles from './LandingTopbar.module.sass';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { MobileNavigation } from './MobileNavigation';
import { DesktopNavigation } from './DesktopNavigation';

interface LandingTopbarProps {
  className?: string;
}

export const LandingTopbar = forwardRef((props: LandingTopbarProps, ref: Ref<HTMLDivElement>) => {
  const { className } = props;

  return (
    <LandingPageSlice ref={ref} className={classNames(className, styles.root)}>
      <Logo />
      <ResponsiveView small={() => <MobileNavigation />} normal={() => <DesktopNavigation />} />
    </LandingPageSlice>
  );
});

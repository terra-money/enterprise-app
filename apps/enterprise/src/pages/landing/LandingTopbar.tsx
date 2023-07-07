import { Logo } from 'components/layout/Logo';
import { forwardRef, Ref } from 'react';
import { LandingPageSlice } from './LandingPageSlice';
import classNames from 'classnames';
import styles from './LandingTopbar.module.sass';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { DesktopNavigation } from './DesktopNavigation';

interface LandingTopbarProps {
  className?: string;
}

// TODO: add mobile navigation
export const LandingTopbar = forwardRef((props: LandingTopbarProps, ref: Ref<HTMLDivElement>) => {
  const { className } = props;

  return (
    <LandingPageSlice ref={ref} className={classNames(className, styles.root)}>
      <Logo />
      <ResponsiveView small={() => null} normal={() => <DesktopNavigation />} />
    </LandingPageSlice>
  );
});

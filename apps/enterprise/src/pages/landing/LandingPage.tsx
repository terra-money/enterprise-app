import { AnimatedPage, ScrollableContainer, StickyHeader } from '@terra-money/apps/components';
import { useRef } from 'react';
import { FeaturesSlice } from './FeaturesSlice';
import { LandingFooter } from './LandingFooter';
import { LandingTopbar } from './LandingTopbar';
import { PrimarySlice } from './PrimarySlice';
import styles from './LandingPage.module.sass';

// TODO:
// 1. Adjust font-sizes, we used the Text primitive component for all texts here
// 2. Update copy everywhere
// 3. Mobile support
// 4. Gradient on the primary slice
// 5. Email for "Contact us" button
// 6. Links for Home and Features
// 7. Update social links

export const LandingPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollableContainer
      ref={ref}
      className={styles.root}
      stickyRef={headerRef}
      header={(visible) => (
        <StickyHeader visible={visible}>
          <LandingTopbar className={styles.compact} />
        </StickyHeader>
      )}
    >
      <LandingTopbar ref={headerRef} />
      <AnimatedPage className={styles.container}>
        <PrimarySlice />
        <FeaturesSlice />
        <LandingFooter />
      </AnimatedPage>
    </ScrollableContainer>
  );
};

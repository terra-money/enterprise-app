import { FeaturesSlice } from './FeaturesSlice';
import { LandingFooter } from './LandingFooter';
import { LandingTopbar } from './LandingTopbar';
import { PrimarySlice } from './PrimarySlice';
import styles from './LandingPage.module.sass';
import { VStack } from 'lib/ui/Stack';

// TODO:
// 1. Adjust font-sizes, we used the Text primitive component for all texts here
// 2. Update copy everywhere
// 3. Mobile support
// 4. Gradient on the primary slice
// 5. Email for "Contact us" button
// 6. Links for Home and Features
// 7. Update social links

export const LandingPage = () => {
  return (
    <VStack>
      <LandingTopbar />
      <div className={styles.container}>
        <PrimarySlice />
        <FeaturesSlice />
        <LandingFooter />
      </div>
    </VStack>
  );
};

import { LandingPageSlice } from './LandingPageSlice';
import styles from './FeaturesSlice.module.sass';
import { SliceHeader } from './SliceHeader';
import { FeaturesExplorer } from './FeaturesExplorer';

export const FeaturesSlice = () => {
  return (
    <LandingPageSlice className={styles.root}>
      <SliceHeader
        title="Why try Enterprise?"
        description="Enterprise was created with one goal in mind: to make DAOs easier to manage. Whether you are  creating a new DAO or importing an existing one, Enterprise has all the tools you need in one place."
      />
      <FeaturesExplorer />
    </LandingPageSlice>
  );
};

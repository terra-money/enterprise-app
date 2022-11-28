import { LandingPageSlice } from './LandingPageSlice';
import { SliceHeader } from './SliceHeader';
import { FeaturesExplorer } from './FeaturesExplorer';
import { useDisplay } from 'hooks';
import classNames from 'classnames';
import styles from './FeaturesSlice.module.sass';

export const FeaturesSlice = () => {
  const { isMobile } = useDisplay();
  return (
    <LandingPageSlice className={classNames(styles.root, { [styles.mobile]: isMobile })}>
      <SliceHeader
        title="Why try Enterprise?"
        description="Enterprise was created with one goal in mind: to make DAOs easier to manage. Whether you are  creating a new DAO or importing an existing one, Enterprise has all the tools you need in one place."
      />
      <FeaturesExplorer />
    </LandingPageSlice>
  );
};

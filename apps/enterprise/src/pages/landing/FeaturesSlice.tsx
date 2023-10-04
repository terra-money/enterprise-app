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
        title="DAOs made easy"
        description="Whether you’re creating a new DAO or importing an existing one, Enterprise has everything you need in one place."
      />
      <FeaturesExplorer />
    </LandingPageSlice>
  );
};

import classNames from 'classnames';
import { Text } from 'lib/ui/Text';
import { useDisplay } from 'hooks';
import { useState } from 'react';
import styles from './FeaturesExplorer.module.sass';

interface Feature {
  title: string;
  description: string;
  imageUrl: string;
}

const features: Feature[] = [
  {
    title: 'Easy setup',
    description: "Connect your wallet and select your DAO type. It's that simple.",
    imageUrl: 'images/landing-dashboard.png',
  },
  {
    title: 'Add DAOs to your watchlist',
    description: 'Follow your favourite DAOs and see what they are up to.',
    imageUrl: 'images/landing-dashboard.png',
  },
  {
    title: 'Monitor DAO treasuries',
    description: "Keep an eye on a DAO's assets and propose how they should be spent.",
    imageUrl: 'images/landing-dashboard.png',
  },
  {
    title: 'Cross-chain functionality (coming soon!)',
    description: 'Create Enterprise DAOs on your favorite chains.',
    imageUrl: 'images/landing-dashboard.png',
  },
];

export const FeaturesExplorer = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);

  const { isMobile } = useDisplay();

  return (
    <div id="featuresExplorer" className={classNames(styles.root, { [styles.mobile]: isMobile })}>
      <div className={styles.list}>
        {features.map(({ title, description }, index) => {
          if (isMobile) {
            return (
              <div key={index} className={styles.item}>
                <Text weight="semibold">{title}</Text>
                <Text size={14} color="supporting">
                  {description}
                </Text>
              </div>
            );
          }

          const isActive = index === activeFeature;
          return (
            <div
              key={index}
              onMouseEnter={() => setActiveFeature(index)}
              className={classNames(styles.item, { [styles.active]: isActive })}
            >
              <Text weight="semibold">{title}</Text>
              <Text size={14} color="supporting">
                {description}
              </Text>
            </div>
          );
        })}
      </div>
      {isMobile === false && <img src={features[activeFeature].imageUrl} alt={features[activeFeature].title} />}
    </div>
  );
};

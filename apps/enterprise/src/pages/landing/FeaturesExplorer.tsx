import classNames from 'classnames';
import { Text } from 'components/primitives';
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
    description: 'Follow your favorite DAOs and see what they are up to.',
    imageUrl: 'images/landing-dashboard.png',
  },
  {
    title: 'Monitor DAO treasuries',
    description: 'Keep an eye on a DAOs assets and propose how they should be spent.',
    imageUrl: 'images/landing-dashboard.png',
  },
  {
    title: 'Trade DAO tokens (coming soon!)',
    description: 'Become a member of different DAOs by trading DAO tokens.',
    imageUrl: 'images/landing-dashboard.png',
  },
];

export const FeaturesExplorer = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);

  return (
    <div id="featuresExplorer" className={styles.root}>
      <div className={styles.list}>
        {features.map(({ title, description }, index) => {
          const isActive = index === activeFeature;
          return (
            <div
              key={index}
              onMouseEnter={() => setActiveFeature(index)}
              className={classNames(styles.item, { [styles.active]: isActive })}
            >
              <Text variant="heading4">{title}</Text>
              <Text variant="text">{description}</Text>
            </div>
          );
        })}
      </div>
      <img src={features[activeFeature].imageUrl} alt={features[activeFeature].title} />
    </div>
  );
};

import classNames from 'classnames';
import { Text } from 'lib/ui/Text';
import { useDisplay } from 'hooks';
import { ReactNode, useState } from 'react';
import styles from './FeaturesExplorer.module.sass';
import { ExternalLink } from 'components/link/ExternalLink';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';

interface Feature {
  title: string;
  description: ReactNode;
  imageUrl: string;
}

const features: Feature[] = [
  {
    title: 'Easy setup',
    description: "Connect your wallet and select your DAO type. It's that simple.",
    imageUrl: 'images/landing-dashboard.png',
  },
  {
    title: 'Manage treasury',
    description: 'Create proposals and initiate transactions, right in the app.',
    imageUrl: 'images/landing-dashboard.png',
  },
  {
    title: 'Distribute rewards',
    description: 'Encourage engagement by distributing rewards to DAO members.',
    imageUrl: 'images/landing-dashboard.png',
  },
  {
    title: 'Cross-chain capabilities (coming soon!)',
    description: (
      <>
        Manage assets on integrated chains.{' '}
        <ExternalLink to="https://terra.sc/enterprisetg">
          <ShyTextButton as="span" text="Contact us" />
        </ExternalLink>{' '}
        to integrate your chain.
      </>
    ),
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

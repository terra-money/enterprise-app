import { DAOLogo } from 'components/dao-logo';
import { NavLink } from 'react-router-dom';
import styles from './Favourites.module.sass';
import { VStack } from 'lib/ui/Stack';
import { usePersonalization } from 'libs/personalization/PersonalizationProvider';
import { Tooltip } from 'lib/ui/Tooltip';

export const Favourites = () => {
  const [{ favourites }] = usePersonalization();

  return (
    <VStack gap={12}>
      {favourites.map((favourite, index) => {
        return (
          <NavLink key={index} className={styles.link} to={`/dao/${favourite.address}`}>
            <Tooltip placement="right" content={favourite.name} renderOpener={props => (
              <div {...props}>
                <DAOLogo className={styles.icon} logo={favourite.logo} />
              </div>
            )} />
          </NavLink>
        );
      })}
    </VStack>
  );
};

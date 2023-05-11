import { DAOLogo } from 'components/dao-logo';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'components/primitives';
import styles from './Favourites.module.sass';
import { VStack } from 'lib/ui/Stack';
import { usePersonalization } from 'libs/personalization/PersonalizationProvider';

export const Favourites = () => {
  const [{ favourites }] = usePersonalization();

  return (
    <VStack gap={12}>
      {favourites.map((favourite, index) => {
        return (
          <NavLink key={index} className={styles.link} to={`/dao/${favourite.address}`}>
            <Tooltip title={favourite.name} placement="right" arrow={true}>
              <DAOLogo className={styles.icon} logo={favourite.logo} />
            </Tooltip>
          </NavLink>
        );
      })}
    </VStack>
  );
};

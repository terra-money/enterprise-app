import { UIElementProps } from '@terra-money/apps/components';
import { ReactComponent as FavouritesIcon } from 'components/assets/Favourites.svg';
import { useNavigate } from 'react-router';
import { usePersonalization } from 'libs/personalization';
import { DAOLogo } from 'components/dao-logo';
import { NavLink } from 'react-router-dom';
import { IconButton, Tooltip } from 'components/primitives';
import { Path } from 'navigation';
import styles from './Favourites.module.sass';
import { VStack } from 'lib/ui/Stack';

interface FavouritesProps extends UIElementProps {}

export const Favourites = (props: FavouritesProps) => {
  const navigate = useNavigate();

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
      <Tooltip title="Manage your favourite DAOs" placement="right" arrow={true}>
        <IconButton variant="outline" onClick={() => navigate(Path.Daos)}>
          <FavouritesIcon />
        </IconButton>
      </Tooltip>
    </VStack>
  );
};

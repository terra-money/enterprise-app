import { ReactComponent as FavouritesIcon } from 'components/assets/Favourites.svg';
import { IconButton } from 'components/primitives';
import { Path } from 'navigation';
import { InternalLink } from 'lib/navigation/Link/InternalLink';

export const ManageDaosButton = () => {
  return (
    <InternalLink to={Path.Daos}>
      <IconButton variant="outline">
        <FavouritesIcon />
      </IconButton>
    </InternalLink>
  );
};

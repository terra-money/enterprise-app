import { ReactComponent as FavouritesIcon } from 'components/assets/Favourites.svg';
import { Path } from 'navigation';
import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { IconButton } from 'lib/ui/buttons/IconButton';

export const ManageDaosButton = () => {
  return (
    <InternalLink to={Path.Daos}>
      <IconButton title="DAOs" icon={<FavouritesIcon />} size="l" as="div" />
    </InternalLink>
  );
};

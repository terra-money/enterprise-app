import { IconButton } from 'components/primitives';
import { ReactComponent as StarIcon } from 'components/assets/Star.svg';
import classNames from 'classnames';
import { DAO } from 'types';
import styles from './FavouriteToggle.module.sass';
import { usePersonalization } from 'libs/personalization/PersonalizationProvider';

type FavouriteToggleSize = 'small' | 'medium';

interface FavouriteToggleProps {
  className?: string;
  dao: DAO;
  size?: FavouriteToggleSize;
}

export const FavouriteToggle = (props: FavouriteToggleProps) => {
  const { className, dao, size = 'medium' } = props;

  const [{ favourites }, dispatch] = usePersonalization();

  const isFavourite = favourites.filter((f) => f.address === dao.address).length > 0;

  return (
    <IconButton
      className={classNames(className, styles.root, {
        [styles.active]: isFavourite,
        [styles.small]: size === 'small',
      })}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();

        isFavourite
          ? dispatch({
              type: 'REMOVE_FAVOURITE',
              payload: dao.address,
            })
          : dispatch({
              type: 'ADD_FAVOURITE',
              payload: {
                address: dao.address,
                name: dao.name,
                logo: dao.logo,
              },
            });
      }}
    >
      <StarIcon />
    </IconButton>
  );
};

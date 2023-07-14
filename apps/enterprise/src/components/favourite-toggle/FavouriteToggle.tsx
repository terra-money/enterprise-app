import { DAO } from 'types';
import { usePersonalization } from 'libs/personalization/PersonalizationProvider';
import { IconButton } from 'lib/ui/buttons/IconButton';
import { StarIcon } from 'lib/ui/icons/StarIcon';
import styled from 'styled-components';
import { matchColor } from 'lib/ui/theme/getters';

interface FavouriteToggleProps {
  className?: string;
  dao: DAO;
}

const Button = styled(IconButton)<{ isFavourite: boolean }>`
  color: ${matchColor('isFavourite', {
    true: 'idle',
    false: 'text',
  })};

  :hover {
    color: ${matchColor('isFavourite', {
      true: 'idle',
      false: 'contrast',
    })};
  }
`;

export const FavouriteToggle = (props: FavouriteToggleProps) => {
  const { dao } = props;

  const [{ favourites }, dispatch] = usePersonalization();

  const isFavourite = favourites.filter((f) => f.address === dao.address).length > 0;

  return (
    <Button
      isFavourite={isFavourite}
      icon={<StarIcon />}
      title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
      size="l"
      onClick={() => {
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
    />
  );
};

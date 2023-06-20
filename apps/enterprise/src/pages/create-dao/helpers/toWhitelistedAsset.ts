import { Token } from 'types';
import { Asset } from 'chain/Asset';

export const toWhitelistedAsset = ({ type, key }: Token): Asset => {
  if (type === 'native' || type === 'ibc') {
    return { id: key, type: 'native' };
  }

  return {
    type: 'cw20',
    id: key,
  };
};

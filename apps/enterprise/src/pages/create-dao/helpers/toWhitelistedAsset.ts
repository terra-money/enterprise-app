import { enterprise_factory } from 'types/contracts';
import { Token } from 'types';

export const toWhitelistedAsset = ({ type, key }: Token): enterprise_factory.AssetInfoBaseFor_Addr => {
  if (type === 'native' || type === 'ibc') {
    return { native: key };
  }

  return {
    cw20: key,
  };
};

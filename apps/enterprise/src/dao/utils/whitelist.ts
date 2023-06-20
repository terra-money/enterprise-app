import { enterprise, enterprise_factory } from 'types/contracts';
import { Asset } from 'chain/Asset';

export const toAsset = (
  response: enterprise.AssetInfoBaseFor_Addr | enterprise_factory.AssetInfoBaseFor_Addr
): Asset | undefined => {
  if ('native' in response) {
    return {
      type: 'native',
      id: response.native,
    };
  } else if ('cw20' in response) {
    return {
      type: 'cw20',
      id: response.cw20,
    };
  }

  return undefined;
};

export const fromAsset = (asset: Asset): enterprise.AssetInfoBaseFor_Addr => {
  if (asset.type === 'native') {
    return {
      native: asset.id,
    };
  }

  return {
    cw20: asset.id,
  };
};

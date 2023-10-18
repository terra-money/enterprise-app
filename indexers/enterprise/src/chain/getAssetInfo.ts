import { Asset, AssetInfo } from 'chain/Asset';
import { getAssetsInfo } from './getAssetsInfo';
import { contractQuery } from './lcd';
import { NetworkName } from './NetworkName';

interface CW20TokenInfoResponse {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
}

interface GetAssetInfoParams {
  asset: Asset;
  networkName: NetworkName
}

export const getAssetInfo = async ({ asset: { id, type }, networkName }: GetAssetInfoParams): Promise<AssetInfo> => {
  if (type === 'cw20') {
    const { name, symbol, decimals } = await contractQuery<CW20TokenInfoResponse>(id, {
      token_info: {},
    });

    return {
      name,
      symbol,
      decimals,
    };
  }

  if (id === 'uluna') {
    return {
      name: 'LUNA',
      symbol: 'LUNA',
      icon: 'https://assets.terra.money/icon/svg/Luna.svg',
      decimals: 6,
    };
  }

  const assets = await getAssetsInfo(networkName);
  const asset = assets.find((asset) => asset.id === id);
  if (asset) {
    return asset
  }

  throw new Error(`Asset with id=${id} not found`);
};

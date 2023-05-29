import { LCDClient } from '@terra-money/feather.js';
import { Asset, AssetInfo } from 'chain/Asset';
import { getAssetsInfo } from './getAssetsInfo';

interface CW20TokenInfoResponse {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
}

interface GetAssetInfoParams {
  asset: Asset;
  lcd: LCDClient;
}

export const getAssetInfo = async ({ asset: { id, type }, lcd }: GetAssetInfoParams): Promise<AssetInfo> => {
  if (type === 'cw20') {
    const { name, symbol, decimals } = await lcd.wasm.contractQuery<CW20TokenInfoResponse>(id, {
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

  const tfmAssets = await getAssetsInfo();
  const tfmAsset = tfmAssets.find((asset) => asset.contract_addr === id);
  if (tfmAsset) {
    return {
      name: tfmAsset.name,
      symbol: tfmAsset.symbol,
      decimals: tfmAsset.decimals,
    };
  }

  throw new Error(`Asset with id=${id} not found`);
};

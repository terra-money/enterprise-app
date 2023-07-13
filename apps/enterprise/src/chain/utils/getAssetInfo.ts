import { LCDClient } from '@terra-money/feather.js';
import { Asset, AssetInfo } from 'chain/Asset';
import { cw20DefaultIcon, getAssetsInfo } from './getAssetsInfo';
import { NetworkName } from 'chain/hooks/useNetworkName';

interface CW20TokenInfoResponse {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
}

interface GetAssetInfoParams {
  asset: Asset;
  lcd: LCDClient;
  networkName: NetworkName;
}

export const getAssetInfo = async ({ asset: { id, type }, lcd, networkName }: GetAssetInfoParams) => {
  const record = await getAssetsInfo(networkName);

  if (record[id]) {
    return record[id];
  }

  if (type === 'cw20') {
    const { name, symbol, decimals } = await lcd.wasm.contractQuery<CW20TokenInfoResponse>(id, {
      token_info: {},
    });

    const result: Asset & AssetInfo = {
      name,
      symbol,
      decimals,
      type: 'cw20',
      id,
      icon: cw20DefaultIcon,
    };

    return result;
  }

  throw new Error(`No info about ${type} asset ${id}`);
};

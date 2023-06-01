import { NetworkName } from '@terra-money/apps/hooks';
import { assertDefined } from '@terra-money/apps/utils';
import axios from 'axios';
import { AssetInfo } from 'chain/Asset';
import { memoize } from 'lib/shared/utils/memoize';

const TFM_ASSETS_INFO_URL = 'https://api-terra2.tfm.com/tokens';

const TFL_ASSETS_INFO_URL = 'https://assets.terra.money/ibc/tokens.json'

interface TFMAssetInfo {
  contract_addr: string;
  decimals: number;
  name: string;
  symbol: string;
}

interface TFLAssetInfo {
  denom: string;
  sybmol?: string;
  name: string;
  icon: string;
  decimals?: number;
}

type TFLAssetsInfo = Record<NetworkName, Record<string, TFLAssetInfo>>

export const getAssetsInfo = memoize(async (network: NetworkName = 'mainnet') => {
  const { data: tflData } = await axios.get<TFLAssetsInfo>(TFL_ASSETS_INFO_URL);
  const assets: Array<AssetInfo & { id: string }> = Object.values(tflData[network]).filter(asset => asset.decimals).map(info => ({
    name: info.name,
    symbol: info.sybmol,
    decimals: assertDefined(info.decimals),
    icon: info.icon,
    id: info.denom,
  }))

  if (network === 'mainnet') {
    const { data: tfmData } = await axios.get<TFMAssetInfo[]>(TFM_ASSETS_INFO_URL);
    const tfmAssets = tfmData.map(info => ({
      name: info.name,
      symbol: info.symbol,
      decimals: info.decimals,
      id: info.contract_addr,
    }))
    assets.push(...tfmAssets)
  }

  return assets;
});

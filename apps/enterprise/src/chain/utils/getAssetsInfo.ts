import { NetworkName } from 'chain/hooks/useNetworkName';
import axios from 'axios';
import { Asset, AssetInfo } from 'chain/Asset';
import { memoize } from 'lib/shared/utils/memoize';

const TFM_ASSETS_INFO_URL = 'https://api-terra2.tfm.com/tokens';

const TFL_IBC_ASSETS_INFO_URL = 'https://assets.terra.dev/ibc/tokens.json';

const TFL_CW20_ASSETS_INFO_URL = 'https://assets.terra.dev/cw20/tokens.json';

interface TFMAssetInfo {
  contract_addr: string;
  decimals: number;
  name: string;
  symbol: string;
}

interface TFLIbcAssetInfo {
  denom: string;
  sybmol?: string;
  name: string;
  icon: string;
  decimals?: number;
}

type TFLIbcAssetsInfo = Record<NetworkName, Record<string, TFLIbcAssetInfo>>;

interface TFLCw20AssetInfo {
  sybmol?: string;
  name: string;
  icon: string;
  decimals?: number;
}

type TFLCw20AssetsInfo = Record<NetworkName, Record<string, TFLCw20AssetInfo>>;

type AssetsInfo = Record<string, AssetInfo & Asset>;

export const lunaInfo: AssetInfo & Asset = {
  name: 'LUNA',
  symbol: 'LUNA',
  icon: 'https://assets.terra.dev/icon/svg/Luna.svg',
  decimals: 6,
  type: 'native',
  id: 'uluna',
};

export const cw20DefaultIcon = 'https://assets.terra.dev/icon/svg/CW.svg';

export const getAssetsInfo = memoize(async (network: NetworkName = 'mainnet') => {
  const result: AssetsInfo = {
    uluna: lunaInfo,
  };

  const { data: tflIbcAssets } = await axios.get<TFLIbcAssetsInfo>(TFL_IBC_ASSETS_INFO_URL);
  Object.values(tflIbcAssets[network]).forEach((info) => {
    if (!info.decimals) return;

    result[info.denom] = {
      name: info.name,
      symbol: info.sybmol,
      decimals: info.decimals,
      icon: info.icon,
      type: 'native',
      id: info.denom,
    };
  });

  const { data: tflCw20Assets } = await axios.get<TFLCw20AssetsInfo>(TFL_CW20_ASSETS_INFO_URL);
  Object.entries(tflCw20Assets[network]).forEach(([id, info]) => {
    if (!info.decimals) return;

    result[id] = {
      name: info.name,
      symbol: info.sybmol,
      decimals: info.decimals,
      icon: info.icon || cw20DefaultIcon,
      type: 'cw20',
      id,
    };
  });

  if (network === 'mainnet') {
    const { data: tfmData } = await axios.get<TFMAssetInfo[]>(TFM_ASSETS_INFO_URL);
    tfmData.forEach((info) => {
      if (!result[info.contract_addr]) {
        const type = info.contract_addr.startsWith('terra') ? 'cw20' : 'native';
        result[info.contract_addr] = {
          name: info.name,
          symbol: info.symbol,
          decimals: info.decimals,
          id: info.contract_addr,
          type,
          icon: type === 'cw20' ? cw20DefaultIcon : undefined,
        };
      }
    });
  }

  return result;
});

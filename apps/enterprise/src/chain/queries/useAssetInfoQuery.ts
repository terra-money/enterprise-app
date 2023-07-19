import { useNetworkName } from 'chain/hooks/useNetworkName';
import { useLcdClient } from '@terra-money/wallet-kit';
import { AssetType } from 'chain';
import { getAssetInfo } from 'chain/utils/getAssetInfo';
import { QUERY_KEY } from 'queries';
import { useQuery } from 'react-query';

export interface AssetInfoQueryParams {
  id: string;
  type: AssetType;
}

interface AssetInfoQueryOptions {
  enabled?: boolean;
}

export const useAssetInfoQuery = (asset: AssetInfoQueryParams, options?: AssetInfoQueryOptions) => {
  const lcdClient = useLcdClient();
  const networkName = useNetworkName();

  return useQuery(
    [QUERY_KEY.ASSET_INFO, asset],
    () => {
      return getAssetInfo({
        asset,
        lcd: lcdClient,
        networkName,
      });
    },
    options
  );
};

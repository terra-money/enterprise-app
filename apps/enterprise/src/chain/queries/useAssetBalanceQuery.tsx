import { useLcdClient } from '@terra-money/wallet-kit';
import { Asset } from 'chain/Asset';
import { getAssetBalance } from 'chain/utils/getAssetBalance';
import { QUERY_KEY } from 'queries';
import { useQuery } from 'react-query';

interface AssetBalanceParamsQuery {
  address: string;
  asset: Asset;
}

export const useAssetBalanceQury = ({ address, asset }: AssetBalanceParamsQuery) => {
  const lcd = useLcdClient();
  return useQuery([QUERY_KEY.ASSET_BALANCE, asset, address], () => {
    return getAssetBalance({
      lcd,
      address,
      asset,
    });
  });
};

import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useQuery } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { AssetInfoWithPrice, getAssetBalanceInUsd } from 'chain/Asset';
import { useLcdClient } from '@terra-money/wallet-kit';
import { getAssetBalance } from 'chain/utils/getAssetBalance';
import { getDaoTotalStakedAmount } from 'dao/utils/getDaoTotalStakedAmount';
import Big from 'big.js';
import { getAssetInfo } from 'chain/utils/getAssetInfo';
import { usePricesOfLiquidAssets } from 'chain/queries/usePricesOfLiquidAssets';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { useNetworkName } from 'chain/hooks/useNetworkName';
import { useCurrentDaoAssetWhitelistQuery } from './useCurrentDaoAssetWhitelistQuery';

export const useDaoAssets = () => {
  const { address, dao_membership_contract } = useCurrentDao();

  const lcd = useLcdClient();

  const networkName = useNetworkName();

  const { data: liquidAssetsPrices } = usePricesOfLiquidAssets();
  const { data: whitelist } = useCurrentDaoAssetWhitelistQuery();

  return useQuery(
    [QUERY_KEY.DAO_ASSETS, address],
    async () => {
      const assets: AssetInfoWithPrice[] = [];
      await Promise.all(
        assertDefined(whitelist).map(async (asset) => {
          let balance = '0';
          try {
            balance = await getAssetBalance({ asset, address, lcd });
            if (asset.id === dao_membership_contract) {
              const totalStakedAmount = await getDaoTotalStakedAmount({ address, lcd });
              balance = Big(balance).minus(totalStakedAmount).toString();
            }
          } catch (err) {
            console.error(`Failed to get balance of ${asset.type} asset with id=${asset.id}: ${err}`);
            return;
          }

          if (balance === '0') return;

          try {
            const info = await getAssetInfo({ asset, lcd, networkName });

            assets.push({
              ...asset,
              ...info,
              balance,
              usd: assertDefined(liquidAssetsPrices)[asset.id] || 0,
            });
          } catch (err) {
            console.error(`Failed to get info for a ${asset.type} asset with id=${asset.id}: ${err}}`);
          }
        })
      );

      return assets.sort((a, b) => getAssetBalanceInUsd(b) - getAssetBalanceInUsd(a));
    },
    {
      enabled: Boolean(liquidAssetsPrices && whitelist),
    }
  );
};

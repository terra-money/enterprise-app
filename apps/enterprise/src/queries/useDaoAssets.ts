import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useQuery } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { useContract } from 'chain/hooks/useContract';
import { enterprise, enterprise_factory } from 'types/contracts';
import { Asset, AssetInfoWithPrice, areSameAsset } from 'chain/Asset';
import { useLCDClient } from '@terra-money/wallet-provider';
import { getAssetBalance } from 'chain/utils/getAssetBalance';
import { getDaoTotalStakedAmount } from 'dao/utils/getDaoTotalStakedAmount';
import Big from 'big.js';
import { getAssetInfo } from 'chain/utils/getAssetInfo';
import { usePricesOfLiquidAssets } from 'chain/queries/usePricesOfLiquidAssets';
import { assertDefined } from '@terra-money/apps/utils';
import { withoutDuplicates } from 'lib/shared/utils/withoutDuplicates';
import { removeUndefinedItems } from 'lib/shared/utils/removeUndefinedItems';
import { useNetworkName } from '@terra-money/apps/hooks';

const toAsset = (
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

export const useDaoAssets = () => {
  const { address, enterprise_factory_contract, dao_membership_contract } = useCurrentDao();
  const { query } = useContract();

  const lcd = useLCDClient();

  const networkName = useNetworkName();

  const { data: liquidAssetsPrices } = usePricesOfLiquidAssets();

  return useQuery(
    [QUERY_KEY.DAO_ASSETS, address],
    async () => {
      const { assets: globalWhitelist } = await query<
        enterprise_factory.QueryMsg,
        enterprise_factory.AssetWhitelistResponse
      >(enterprise_factory_contract, { global_asset_whitelist: {} });
      const { assets: assetsWhitelist } = await query<enterprise.QueryMsg, enterprise.AssetWhitelistResponse>(address, {
        asset_whitelist: {},
      });

      const whitelist: Asset[] = withoutDuplicates(removeUndefinedItems([...globalWhitelist, ...assetsWhitelist].map(toAsset)), areSameAsset);

      const assets: AssetInfoWithPrice[] = [];
      await Promise.all(
        whitelist.map(async (asset) => {
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

          if (balance === '0') return

          try {
            const info = await getAssetInfo({ asset, lcd, networkName });

            assets.push({
              ...asset,
              ...info,
              balance,
              usd: assertDefined(liquidAssetsPrices)[asset.id] || 0,
            });
          } catch (err) {
            console.log(`Failed to get info for a ${asset.type} asset with id=${asset.id}: ${err}}`);
          }
        })
      );

      return assets;
    },
    {
      enabled: !!liquidAssetsPrices,
    }
  );
};

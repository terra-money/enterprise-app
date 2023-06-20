import { useQuery } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { useContract } from 'chain/hooks/useContract';
import { enterprise } from 'types/contracts';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { getLast } from 'lib/shared/utils/getlast';
import { areSameAsset } from 'chain/Asset';
import { removeUndefinedItems } from 'lib/shared/utils/removeUndefinedItems';
import { withoutDuplicates } from 'lib/shared/utils/withoutDuplicates';
import { toAsset } from 'dao/utils/whitelist';
import { useCurrentDaoGlobalAssetWhitelistQuery } from './useCurrentDaoGlobalAssetWhitelistQuery';
import { fetchAll } from 'lib/shared/utils/fetchAll';

const limit = 30;

export const useCurrentDaoAssetWhitelistQuery = () => {
  const { address, dao_code_version } = useCurrentDao();
  const { query } = useContract();

  const { data: globalWhitelist } = useCurrentDaoGlobalAssetWhitelistQuery();

  const { data: customWhitelist } = useQuery([QUERY_KEY.CUSTOM_ASSET_WHITELIST, address], async () => {
    const hasPaginatedWhitelist = Number(dao_code_version) >= 5;

    let result: enterprise.AssetInfoBaseFor_Addr[] = [];

    if (hasPaginatedWhitelist) {
      result = await fetchAll<enterprise.AssetInfoBaseFor_Addr, enterprise.AssetInfoBaseFor_Addr>(
        async (start_after) => {
          const { assets } = await query<enterprise.QueryMsg, enterprise.AssetWhitelistResponse>(address, {
            asset_whitelist: {
              start_after,
              limit,
            },
          });

          return assets;
        },
        (lastPage) => (lastPage.length < limit ? null : getLast(lastPage))
      );
    } else {
      const { assets } = await query<enterprise.QueryMsg, enterprise.AssetWhitelistResponse>(address, {
        asset_whitelist: {},
      });

      result = assets;
    }

    return removeUndefinedItems(result.map(toAsset));
  });

  if (customWhitelist && globalWhitelist) {
    return {
      data: withoutDuplicates([...globalWhitelist, ...customWhitelist], areSameAsset),
    };
  }

  return {
    data: undefined,
  };
};

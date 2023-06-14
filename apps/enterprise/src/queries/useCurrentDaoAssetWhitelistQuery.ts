import { useQuery } from "react-query"
import { QUERY_KEY } from "./queryKey"
import { useContract } from "chain/hooks/useContract";
import { enterprise } from "types/contracts";
import { useCurrentDao } from "dao/components/CurrentDaoProvider";
import { getLast } from "lib/shared/utils/getlast";
import { Asset, areSameAsset } from "chain/Asset";
import { removeUndefinedItems } from "lib/shared/utils/removeUndefinedItems";
import { withoutDuplicates } from "lib/shared/utils/withoutDuplicates";
import { toAsset } from "dao/utils/whitelist";
import { useCurrentDaoGlobalAssetWhitelistQuery } from "./useCurrentDaoGlobalAssetWhitelistQuery";
import { fetchAll } from "lib/shared/utils/fetchAll";

const limit = 30

export const fromAsset = (asset: Asset): enterprise.AssetInfoBaseFor_Addr => {
  if (asset.type === 'native') {
    return {
      native: asset.id,
    };
  }

  return {
    cw20: asset.id,
  };
}

export const useCurrentDaoAssetWhitelistQuery = () => {
  const { address, dao_code_version } = useCurrentDao()
  const { query } = useContract();

  const { data: globalWhitelist } = useCurrentDaoGlobalAssetWhitelistQuery()

  const { data: assetsWhitelist } = useQuery(
    [QUERY_KEY.PROPOSAL_VOTES, address],
    async () => {
      const hasPaginatedWhitelist = Number(dao_code_version) >= 5

      if (hasPaginatedWhitelist) {
        return fetchAll<enterprise.AssetInfoBaseFor_Addr, enterprise.AssetInfoBaseFor_Addr>(
          async start_after => {
            const { assets } = await query<enterprise.QueryMsg, enterprise.AssetWhitelistResponse>(address, {
              asset_whitelist: {
                start_after,
                limit
              },
            })

            return assets
          },
          lastPage => lastPage.length < limit ? null : getLast(lastPage)
        )
      }

      const { assets } = await query<enterprise.QueryMsg, enterprise.AssetWhitelistResponse>(address, {
        asset_whitelist: {},
      });

      return assets
    }
  );

  if (!assetsWhitelist || !globalWhitelist) {
    return {
      data: undefined,
    }
  }

  const data: Asset[] = withoutDuplicates(removeUndefinedItems([...globalWhitelist, ...assetsWhitelist.map(toAsset)]), areSameAsset);

  return {
    data,
  }
}
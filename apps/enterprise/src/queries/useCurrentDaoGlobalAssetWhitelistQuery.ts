import { useQuery } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { useContract } from 'chain/hooks/useContract';
import { enterprise_factory } from 'types/contracts';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { removeUndefinedItems } from 'lib/shared/utils/removeUndefinedItems';
import { toAsset } from 'dao/utils/whitelist';

export const useCurrentDaoGlobalAssetWhitelistQuery = () => {
  const { address, enterprise_factory_contract } = useCurrentDao();
  const { query } = useContract();

  return useQuery([QUERY_KEY.GLOBAL_ASSET_WHITELIST, address], async () => {
    const { assets } = await query<enterprise_factory.QueryMsg, enterprise_factory.AssetWhitelistResponse>(
      enterprise_factory_contract,
      { global_asset_whitelist: {} }
    );

    return removeUndefinedItems(assets.map(toAsset));
  });
};

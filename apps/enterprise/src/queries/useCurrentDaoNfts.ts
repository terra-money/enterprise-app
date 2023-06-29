import { useCurrentDao } from "dao/components/CurrentDaoProvider";
import { useCurrentDaoNftWhitelistQuery } from "./useCurrentDaoNftWhitelistQuery";
import { useQuery } from "react-query";
import { QUERY_KEY } from "./queryKey";
import { NftWithPrice } from "chain/Nft";
import { getNfts } from "chain/utils/getNfts";
import { useContract } from "chain/hooks/useContract";
import { assertDefined } from "@terra-money/apps/utils";
import { usePricesOfLiquidAssets } from "chain/queries/usePricesOfLiquidAssets";
import { useCurrentDaoStakedNfts } from "./useCurrentDaoStakedNfts";
import { getCollectionInfo } from "chain/utils/getCollectionInfo";
import { retry } from "lib/shared/utils/retry";

export const useCurrentDaoNfts = () => {
  const { address, dao_type, dao_membership_contract } = useCurrentDao();

  const { data: whitelist } = useCurrentDaoNftWhitelistQuery();
  const { data: liquidAssetsPrices } = usePricesOfLiquidAssets();
  const { data: stakedNfts } = useCurrentDaoStakedNfts();

  const { query } = useContract()

  return useQuery([QUERY_KEY.DAO_NFTS, address], async () => {
    return (await Promise.all(assertDefined(whitelist).map(async collection => {
      let nfts: NftWithPrice[] = (await getNfts({ collection, owner: address, query }))

      if (dao_type === 'nft' && collection === dao_membership_contract) {
        const stakedNftsSet = new Set(assertDefined(stakedNfts))
        nfts = nfts.filter(({ id }) => !stakedNftsSet.has(id))
      }

      const info = await retry({
        func: () => getCollectionInfo(collection),
        delay: 5000
      })
      if (info.floorPriceInLuna) {
        const lunaPrice = assertDefined(liquidAssetsPrices)['uluna']
        const usd = info.floorPriceInLuna * lunaPrice
        nfts = nfts.map(nft => ({
          ...nft,
          usd
        }))
      }

      return nfts
    }))).flat()
  }, {
    enabled: Boolean(whitelist && liquidAssetsPrices && stakedNfts)
  })
}
import { useCurrentDao } from "dao/components/CurrentDaoProvider";
import { useCurrentDaoNftWhitelistQuery } from "./useCurrentDaoNftWhitelistQuery";
import { useQuery } from "react-query";
import { QUERY_KEY } from "./queryKey";
import { NftInfoWithPrice } from "chain/Nft";
import { getNfts } from "chain/utils/getNfts";
import { useContract } from "chain/hooks/useContract";
import { assertDefined } from "@terra-money/apps/utils";
import { usePricesOfLiquidAssets } from "chain/queries/usePricesOfLiquidAssets";
import { getNftInfo } from "chain/utils/getNftInfo";

export const useCurrentDaoNfts = () => {
  const { address } = useCurrentDao();

  const { data: whitelist } = useCurrentDaoNftWhitelistQuery();
  const { data: liquidAssetsPrices } = usePricesOfLiquidAssets();

  const { query } = useContract()

  return useQuery([QUERY_KEY.DAO_NFTS, address], async () => {
    console.log('useCurrentDaoNfts')
    return (await Promise.all(assertDefined(whitelist).map(async collection => {
      const nfts = (await getNfts({ collection, owner: address, query }))

      return Promise.all(nfts.map(async ({ collection, id }) => {
        let nft: NftInfoWithPrice = {
          collection,
          id,
          usd: undefined,
          name: undefined,
          image: undefined
        }

        try {
          const info = await getNftInfo(nft)
          nft = { ...nft, ...info }
        } catch {
          console.error(`Failed to get info for an NFT collection=${collection} id=${id}`);
        }

        return nft
      }))
    }))).flat()
  }, {
    enabled: Boolean(whitelist && liquidAssetsPrices)
  })
}
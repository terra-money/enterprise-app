import { useCurrentDao } from "dao/components/CurrentDaoProvider";
import { useCurrentDaoNftWhitelistQuery } from "./useCurrentDaoNftWhitelistQuery";
import { useQuery } from "react-query";
import { QUERY_KEY } from "./queryKey";
import { NftInfoWithPrice } from "chain/Nft";
import { getNfts } from "chain/utils/getNfts";
import { useContract } from "chain/hooks/useContract";
import { assertDefined } from "@terra-money/apps/utils";

export const useCurrentDaoNfts = () => {
  const { address } = useCurrentDao();

  const { data: whitelist } = useCurrentDaoNftWhitelistQuery();

  const { query } = useContract()

  return useQuery([QUERY_KEY.DAO_NFTS, address], async () => {
    return (await Promise.all(assertDefined(whitelist).map(async collection => {
      const nfts: NftInfoWithPrice[] = (await getNfts({ collection, owner: address, query })).map(nft => ({
        ...nft,
        usd: undefined,
        name: undefined,
        image: undefined
      }))

      return nfts
    }))).flat()
  }, {
    enabled: !!whitelist
  })
}
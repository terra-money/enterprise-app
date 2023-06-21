import { useCurrentDao } from "dao/components/CurrentDaoProvider";
import { useCurrentDaoNftWhitelistQuery } from "./useCurrentDaoNftWhitelistQuery";
import { useQuery } from "react-query";
import { QUERY_KEY } from "./queryKey";
import { NftInfoWithPrice } from "chain/Nft";
import { getNfts } from "chain/utils/getNfts";
import { useContract } from "chain/hooks/useContract";
import { assertDefined } from "@terra-money/apps/utils";
import { usePricesOfLiquidAssets } from "chain/queries/usePricesOfLiquidAssets";
import { getAssetInfo } from "chain/utils/getAssetInfo";
import { useNetworkName } from '@terra-money/apps/hooks';
import { useLCDClient } from '@terra-money/wallet-provider';
import { fromChainAmount } from "chain/utils/fromChainAmount";
import { getNftInfo } from "chain/utils/getNftInfo";

export const useCurrentDaoNfts = () => {
  const { address } = useCurrentDao();

  const { data: whitelist } = useCurrentDaoNftWhitelistQuery();
  const { data: liquidAssetsPrices } = usePricesOfLiquidAssets();

  const { query } = useContract()
  const lcd = useLCDClient();
  const networkName = useNetworkName();

  return useQuery([QUERY_KEY.DAO_NFTS, address], async () => {
    return (await Promise.all(assertDefined(whitelist).map(async collection => {
      const nfts = (await getNfts({ collection, owner: address, query }))

      return Promise.all(nfts.map(async ({ collection, id }) => {
        const nft: NftInfoWithPrice = {
          collection,
          id,
          usd: undefined,
          name: undefined,
          image: undefined
        }

        try {
          const info = await getNftInfo(nft)
          console.log(info)
          if (info) {
            if (info.denom && info.price) {
              try {
                const { decimals } = await getAssetInfo({
                  asset: {
                    id: info.denom,
                    type: 'native'
                  }, lcd, networkName
                });

                const assetPriceInUsd = assertDefined(liquidAssetsPrices)[info.denom]
                if (assetPriceInUsd) {
                  nft.usd = fromChainAmount(info.price, decimals) * assetPriceInUsd
                }
              } catch (err) {
                console.error(`Failed to get decimals for a denom=${info.denom}: ${err}`);
              }
            }
          }

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
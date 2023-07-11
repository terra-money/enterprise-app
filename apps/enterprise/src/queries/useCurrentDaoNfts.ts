import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useCurrentDaoNftWhitelistQuery } from './useCurrentDaoNftWhitelistQuery';
import { useQuery } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { NftWithPrice } from 'chain/Nft';
import { getNfts } from 'chain/utils/getNfts';
import { useContract } from 'chain/hooks/useContract';
import { usePricesOfLiquidAssets } from 'chain/queries/usePricesOfLiquidAssets';
import { useCurrentDaoStakedNfts } from './useCurrentDaoStakedNfts';
import { getCollectionInfo } from 'chain/utils/getCollectionInfo';
import { retry } from 'lib/shared/utils/retry';
import { assertDefined } from 'lib/shared/utils/assertDefined';

export const useCurrentDaoNfts = () => {
  const { address, dao_type, dao_membership_contract } = useCurrentDao();

  const { data: whitelist } = useCurrentDaoNftWhitelistQuery();
  const { data: liquidAssetsPrices } = usePricesOfLiquidAssets();
  const { data: stakedNfts } = useCurrentDaoStakedNfts();

  const { query } = useContract();

  return useQuery(
    [QUERY_KEY.DAO_NFTS, address],
    async () => {
      return (
        await Promise.all(
          assertDefined(whitelist).map(async (collection) => {
            let nfts: NftWithPrice[] = await getNfts({ collection, owner: address, query });

            if (dao_type === 'nft' && collection === dao_membership_contract) {
              const stakedNftsSet = new Set(assertDefined(stakedNfts));
              nfts = nfts.filter(({ id }) => !stakedNftsSet.has(id));
            }

            const info = await retry({
              func: () => getCollectionInfo(collection),
              delay: 5000,
            });
            if (info.floorPriceInLuna) {
              const lunaPrice = assertDefined(liquidAssetsPrices)['uluna'];
              const usd = info.floorPriceInLuna * lunaPrice;
              nfts = nfts.map((nft) => ({
                ...nft,
                usd,
              }));
            }

            return nfts;
          })
        )
      ).flat();
    },
    {
      enabled: Boolean(whitelist && liquidAssetsPrices && stakedNfts),
    }
  );
};

// TODO: try myNfts query to reduce the number of queries

/*
query getMyNFTsData {
              myTokens(
                owner: ["terra1exj6fxvrg6xuukgx4l90ujg3vh6420540mdr6scrj62u2shk33sqnp0stl"],
                collectionAddr:["terra17z7fpaa8kah698xn5tarrcucvualdy4wsztkfc404g3garucpu6qmxp50g"],
                precision:2,
                chain:["terra2"],
                ,
                collectionSorting:"lastPrice",
                tokenAsc:true,
                limit: 10,
                offset: 0,
                tokenSorting:"lastPrice",
                ,
                ) {
                    totalPrices
                    totalPricesUsd
                    totalFloorPricesUsd
                    totalFloorPrice
                    tokensCount
                    pageInfo {
                      hasNextPage
                      count
                      hasPreviousPage
                      offset
                    }
                    collections {
                      bestOffer
                      bestOfferUsd
                      denom {
                        symbol
                        icon
                        denom
                        chain
                        decimals
                      }
                      chain{
                        chainId
                        icon
                        prettyName
                        value
                      }
                      tokens {
                        tokenId
                        rarity
                        rank
                        owner
                        name
                        marketplace{
                          chain
                          image
                          name
                          url
                          value
                        }
                        lastPrice
                        lastListing
                        imageUrlFileserver
                        dealScore
                        collectionName
                        collectionFloorPrice
                        collectionAddr
                        chain{
                          chainId
                          icon
                          prettyName
                          value
                        }
                        denom {
                          symbol
                          icon
                          denom
                          chain
                          decimals
                          priceUsd
                        }
                      }
                      bannerSrcFileserver
                      chain{
                        chainId
                        icon
                        prettyName
                        value
                      }
                      collectionAddr
                      collectionName
                      collectionSocial
                      floorPrice
                      market
                      srcFileserver
                      tokensCount
                      totalFloorPrice
                      totalFloorPriceUsd
                      totalPrices
                      totalPricesUsd
                       denom {
                        chain
                        symbol
                        priceUsd
                        nativeDenomRate
                        denom
                        icon
                        decimals
                      }
                    }
                }
              }
*/

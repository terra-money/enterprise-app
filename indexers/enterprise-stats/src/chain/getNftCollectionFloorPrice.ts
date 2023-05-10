import axios from 'axios'
import { getAssetPrice } from "./getAssetPrice";
import { fromChainAmount } from "./fromChainAmount";
import memoize from 'memoizee'

const TFM_NFT_COLLECTION_URL = 'https://nft.api.tfm.com/collections/terra2'
const TFM_URL_POSTFIX = '&limit=100&offset=0'

interface TFMNFTCollectionResponse {
  content: {
    floor_price: number | null
  }[],
  denom: {
    contract_addr: string,
    decimals: number
  }
}

export const getNFTCollectionFloorPrice = memoize(async (address: string): Promise<number | null> => {
  const nftCollectionUrl = `${TFM_NFT_COLLECTION_URL}?collection_addr=${address}${TFM_URL_POSTFIX}`

  try {
    const { data: { content, denom } } = await axios.get<TFMNFTCollectionResponse>(nftCollectionUrl)
    const price = content[0]?.floor_price ?? null
    if (!price) {
      return null
    }

    const denomPrice = await getAssetPrice({ id: denom.contract_addr, type: 'native' })
    return fromChainAmount(price, denom.decimals) * denomPrice
  } catch (err) {
    console.error(`Error getting NFT collection=${address} info`, err)
  }

  return null
})
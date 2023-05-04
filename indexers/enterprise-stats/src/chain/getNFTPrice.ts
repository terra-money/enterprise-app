import { NFT } from "./NFT";
import axios from 'axios'
import { getAssetPrice } from "./getAssetPrice";
import { getAssetInfo } from "./getAssetInfo";
import { fromChainAmount } from "./fromChainAmount";

const TFM_NFT_URL = 'https://nft.api.tfm.com/nfts/terra2'
const TFM_NFT_COLLECTION_URL = 'https://nft.api.tfm.com/collections/terra2'
const TFM_URL_POSTFIX = '&limit=100&offset=0'

interface TFMNFTResponse {
  content: {
    price: number | null
    denom: string
  }[]
}

interface TFMNFTCollectionResponse {
  content: {
    floor_price: number | null
  }[],
  denom: {
    contract_addr: string,
    decimals: number
  }
}

export const getNFTPrice = async (nft: NFT): Promise<number | null> => {
  const nftUrl = `${TFM_NFT_URL}/${nft.address}?nft_id=${nft.id}${TFM_URL_POSTFIX}`

  let price: number | null = null
  let denom: string | null = null

  try {
    const { data } = await axios.get<TFMNFTResponse>(nftUrl)
    price = data.content[0]?.price ?? null
    denom = data.content[0]?.denom ?? null
  } catch (err) {
    console.error(`Error getting NFT price collection=${nft.address} id=${nft.id}`, err)
  }

  if (price === null) {
    const nftCollectionUrl = `${TFM_NFT_COLLECTION_URL}?collection_addr=${nft.address}${TFM_URL_POSTFIX}`

    try {
      const { data } = await axios.get<TFMNFTCollectionResponse>(nftCollectionUrl)
      price = data.content[0]?.floor_price ?? null
      denom = data.denom?.contract_addr ?? null
    } catch (err) {
      console.error(`Error getting NFT collection=${nft.address} info`, err)
    }
  }

  if (price === null || denom === null) {
    return null
  }

  const denomPrice = await getAssetPrice({ id: denom, type: 'native' })
  const { decimals } = await getAssetInfo({ id: denom, type: 'native' })

  return fromChainAmount(price, decimals) * denomPrice
}
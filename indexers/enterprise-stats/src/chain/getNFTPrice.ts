import { NFT } from "./NFT";
import axios from 'axios'
import { getAssetInfo } from "./getAssetInfo";
import { fromChainAmount } from "./fromChainAmount";
import { getNFTCollectionFloorPrice } from "./getNftCollectionFloorPrice";

const TFM_NFT_URL = 'https://nft.api.tfm.com/nfts/terra2'
const TFM_URL_POSTFIX = '&limit=100&offset=0'

interface TFMNFTResponse {
  content: {
    price: number | null
    denom: string
  }[]
}

export const getNFTPrice = async (nft: NFT): Promise<number | null> => {
  const nftUrl = `${TFM_NFT_URL}/${nft.address}?nft_id=${nft.id}${TFM_URL_POSTFIX}`

  try {
    const { data } = await axios.get<TFMNFTResponse>(nftUrl)
    const price = data.content[0]?.price ?? null
    const denom = data.content[0]?.denom ?? null
    const { decimals } = await getAssetInfo({ id: denom, type: 'native' })
    return fromChainAmount(price, decimals) * price
  } catch (err) {
    console.error(`Error getting NFT price collection=${nft.address} id=${nft.id}`, err.toString())
  }

  return getNFTCollectionFloorPrice(nft.address)
}
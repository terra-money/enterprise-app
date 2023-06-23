import axios from 'axios'
import { Nft } from 'chain/Nft'

const TFM_NFT_API = 'https://nft-multichain.tfm.com/graphql'

interface TFMError {
  message: string
}

interface NftTokenDenom {
  priceUsd: number
}

interface NftToken {
  price: number | null
  denom: NftTokenDenom
  collectionFloorPrice: number | null
  tokenId: string
  name: string | null
  collectionName: string | null
  imageUrlFileserver: string | null
  priceUsd: number | null
}

interface TFMResponse {
  data: {
    getToken: {
      token: NftToken
    }
  },
  errors?: TFMError[]
}

const getQuery = ({ collection, id }: Nft) => `
query MyQuery {
  getToken(collectionAddr: "${collection}", tokenId: "${id}", chain: "terra2") {
    token {
      name
      collectionName
      imageUrlFileserver
    }
  }
}
`

export interface TfmNftInfo {
  usd?: number
  name?: string
  image?: string
}

export type NftsFromCollection = Record<string, TfmNftInfo>

export const getNftInfo = async (nft: Nft) => {
  const { data: { data, errors } } = await axios.post<TFMResponse>(TFM_NFT_API, {
    query: getQuery(nft),
    operationName: "MyQuery",
  })

  if (errors) {
    throw new Error(`Failed to info for NFT collection=${nft.collection} id=${nft.id} from ${TFM_NFT_API}: ${errors[0]?.message}`)
  }

  const token = data.getToken.token

  if (!token) return

  const info: TfmNftInfo = {
    name: token.name || token.collectionName || undefined,
    image: token.imageUrlFileserver || undefined
  }

  return info
}
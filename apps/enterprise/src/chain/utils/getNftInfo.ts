import axios from 'axios'
import { Nft } from 'chain/Nft'

const TFM_NFT_API = 'https://nft-terra2.tfm.dev/graphql'

interface TFMError {
  message: string
}

interface NftToken {
  price: number | null
  denom: string
  collectionFloorPrice: number | null
  tokenId: string
}

interface TFMResponse {
  data: {
    token: {
      tokens: NftToken[]
    }
  },
  errors?: TFMError[]
}

const getQuery = ({ collection, id }: Nft) => `
query MyQuery {
  token(collectionAddr: "${collection}", tokenId: "${id}") {
    tokens {
      collectionFloorPrice
      price
      denom
      tokenId
    }
  }
}
`

export interface TfmNftInfo {
  price?: number
  denom?: string
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

  const token = data.token.tokens[0]

  if (!token) return

  const price = token.price || token.collectionFloorPrice || undefined

  const info: TfmNftInfo = {
    price: token.price || token.collectionFloorPrice || undefined,
    denom: token.denom || (price ? 'uluna' : undefined),
  }

  return info
}
import axios from 'axios'
import { Nft } from 'chain/Nft'

const TFM_NFT_API = 'https://nft-multichain.tfm.com/graphql'

interface TFMError {
  message: string
}

interface NftTokenDenom {
  priceUsd: number
  nativeDenomRate: number
}

interface NftToken {
  price: number | null
  denom: NftTokenDenom
  collectionFloorPrice: number | null
  tokenId: string
}

interface TFMResponse {
  data: {
    getTokens: {
      token: NftToken
    }
  },
  errors?: TFMError[]
}

const getQuery = ({ collection, id }: Nft) => `
query MyQuery {
  getToken(collectionAddr: "${collection}", tokenId: "${id}", chain: "terra2") {
    token {
      collectionFloorPrice
      price
      denom {
        priceUsd
        nativeDenomRate
      }
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

  const token = data.getTokens.token

  if (!token) return

  const price = token.price || token.collectionFloorPrice || undefined
  console.log(price)

  const info: TfmNftInfo = {
    price: token.price || token.collectionFloorPrice || undefined,
    denom: undefined
    // denom: token.denom || (price ? 'uluna' : undefined),
  }

  return info
}
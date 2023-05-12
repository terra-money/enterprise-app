import memoize from 'memoizee'
import axios from 'axios'
import { convertCollectionPriceToUsd } from './getFloorPricesOfSupportedNFTCollections'

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

const getQuery = (collection: string) => `
query MyQuery {
  token(collectionAddr: "${collection}", limit: 10000) {
    tokens {
      collectionFloorPrice
      price
      denom
      tokenId
    }
  }
}
`

type NftPrice = Record<string, number>

export const getPricesOfNftsInCollection = memoize(async (collection: string) => {
  const { data: { data, errors } } = await axios.post<TFMResponse>(TFM_NFT_API, {
    query: getQuery(collection),
    operationName: "MyQuery",
  })

  if (errors) {
    throw new Error(`Failed to get prices of NFTs in collection=${collection} from ${TFM_NFT_API}: ${errors[0]?.message}`)
  }

  const record: NftPrice = {}

  await Promise.all(data.token.tokens.map(async (token) => {
    const price = token.price || token.collectionFloorPrice
    if (!price) return

    record[token.tokenId] = await convertCollectionPriceToUsd({ denom: token.denom, price })
  }))

  return record
})
import axios from 'axios'

const TFM_NFT_API = 'https://nft-multichain.tfm.com/graphql'

interface TFMError {
  message: string
}

interface TfmCollection {
  floorPrice: number | null
}

interface TFMResponse {
  data: {
    getCollection: {
      content: TfmCollection[]
    }
  },
  errors?: TFMError[]
}

const getQuery = (collection: string) => `
query MyQuery {
  getCollection(collectionAddr: "${collection}", chain: "terra2") {
    content {
      floorPrice
    }
  }
}
`

export const getCollectionInfo = async (collection: string) => {
  const { data: { data, errors } } = await axios.post<TFMResponse>(TFM_NFT_API, {
    query: getQuery(collection),
    operationName: "MyQuery",
  })

  if (errors) {
    throw new Error(`Failed to get info for NFT collection=${collection} from ${TFM_NFT_API}: ${errors[0]?.message}`)
  }

  const info = data.getCollection.content[0]

  const floorPriceInLuna = info?.floorPrice || undefined

  return {
    floorPriceInLuna
  }
}
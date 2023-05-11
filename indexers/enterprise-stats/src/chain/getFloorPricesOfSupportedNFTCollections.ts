import memoize from 'memoizee'
import axios from 'axios'
import { getAssetPrice } from './getAssetPrice'
import { getAssetInfo } from './getAssetInfo'
import { fromChainAmount } from './fromChainAmount'

const TFM_NFT_API = 'https://nft-terra2.tfm.dev/graphql'

interface TFMError {
  message: string
}

interface TFMFloorPrice {
  price?: number
  denom?: string
}

interface TFMStatisticContent {
  floorPrice: TFMFloorPrice
  collectionAddr: string
}

interface TFMResponse {
  data: {
    collectionTable: {
      content: TFMStatisticContent[]
    }
  },
  errors?: TFMError[]
}

const query = `
query MyQuery {
  collectionTable(limit: 100000) {
    content {
      floorPrice
      collectionAddr
    }
  }
}
`

type NFTCollectionFloorPrice = Record<string, number>

const getDataFromTFMCollectionTable = memoize(async () => {
  const { data: { data, errors } } = await axios.post<TFMResponse>(TFM_NFT_API, {
    query,
    operationName: "MyQuery",
    variables: null
  })

  if (errors) {
    throw new Error(`Failed to get NFT collections from ${TFM_NFT_API}: ${errors[0]?.message}`)
  }

  return data.collectionTable.content
})

export const convertCollectionPriceToUsd = async ({ denom, price }: TFMFloorPrice) => {
  if (!denom || !price) {
    return 0
  }

  try {
    const { decimals } = await getAssetInfo({ id: denom, type: 'native' })

    const denomPrice = await getAssetPrice({ id: denom, type: 'native' })

    return fromChainAmount(denomPrice, decimals) * price
  } catch (err) {
    console.error(`Error getting price of a denom=${denom}`, err)
  }

  return 0
}

export const getFloorPricesOfSupportedNFTCollections = memoize(async () => {
  const data = await getDataFromTFMCollectionTable()

  const record: NFTCollectionFloorPrice = {}

  await Promise.all(data.map(async ({ collectionAddr, floorPrice }) => {
    record[collectionAddr] = await convertCollectionPriceToUsd(floorPrice)
  }))

  return record
})

export const getSupportedNFTCollections = memoize(async () => {
  const data = await getDataFromTFMCollectionTable()

  return new Set(data.map(({ collectionAddr }) => collectionAddr))
})
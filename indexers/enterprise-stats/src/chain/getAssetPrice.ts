import { Asset } from './Asset'
import memoize from 'memoizee'
import axios from 'axios'

const TFM_PRICE_API = 'https://prod-juno.analytics.tfm.com/graphql'

interface TFMError {
  message: string
}

interface TFMStatisticContent {
  liquidity: string,
  priceInvertedUsd: string
}

interface TFMResponse {
  data: {
    statisticTableTokensList: {
      content: TFMStatisticContent[]
    }
  },
  errors?: TFMError[]
}

// docs: https://prod-juno.analytics.tfm.com/graphql#
const query = `
query TokenInfo ($token: String, $interval: String\u0021, $chain: String\u0021) { 
  statisticTableTokensList (token: $token, interval: $interval, chain: $chain) { 
    content { 
      liquidity,
      priceInvertedUsd
    }
  }
}
`

const MIN_LIQUIDITY = 5000

export const getAssetPrice = memoize(async (asset: Asset): Promise<number> => {
  const { data: { data, errors } } = await axios.post<TFMResponse>(TFM_PRICE_API, {
    query,
    variables: {
      token: asset.id,
      interval: '1d',
      chain: 'terra2'
    }
  })

  if (errors) {
    console.log(`Failed to get price for ${asset.type} asset with id=${asset.id} from ${TFM_PRICE_API}`, errors[0]?.message)
    return 0
  }

  const { liquidity: strLiquidity, priceInvertedUsd } = data.statisticTableTokensList.content[0]
  const liquidity = Number(strLiquidity)
  if (!liquidity || liquidity < MIN_LIQUIDITY) {
    return 0
  }

  return Number(priceInvertedUsd) || 0
})
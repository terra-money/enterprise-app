import axios from 'axios';

const TFM_PRICE_API = 'https://prod-juno.analytics.tfm.com/graphql';

interface TFMError {
  message: string;
}

interface TFMStatisticContent {
  liquidity: string;
  priceInvertedUsd: string;
  contractAddr: string;
  token0Addr: string;
  token1Addr: string;
}

interface TFMResponse {
  data: {
    statisticTableTokensList: {
      content: TFMStatisticContent[];
    };
  };
  errors?: TFMError[];
}

// docs: https://prod-juno.analytics.tfm.com/graphql#
const query = `
query tokens_table($limit: Int, $skip: Int, $verifiedOnly: Boolean, $field: String, $asc: Boolean, $interval: String\u0021, $chain: String\u0021) {
  statisticTableTokensList(
    limit: $limit
    skip: $skip
    verifiedOnly: $verifiedOnly
    field: $field
    asc: $asc
    interval: $interval
    chain: $chain
  ) {
    content {
      liquidity
      priceInvertedUsd
      contractAddr
      token0Addr
      token1Addr
    }
    pageInfo {
      asc
      count
      limit
      skip
      sortField
    }
  }
}
`;

const MIN_LIQUIDITY = 5000;

type AssetPrices = Record<string, number>;

export const getPricesOfLiquidAssets = async () => {
  const {
    data: { data, errors },
  } = await axios.post<TFMResponse>(TFM_PRICE_API, {
    query,
    operationName: 'tokens_table',
    variables: {
      limit: 500,
      skip: 0,
      verifiedOnly: false,
      field: 'volume',
      asc: false,
      interval: '1d',
      chain: 'terra2',
    },
  });

  if (errors) {
    throw new Error(`Failed to get liquid asset prices from ${TFM_PRICE_API}: ${errors[0]?.message}`);
  }

  const record: AssetPrices = {};

  data.statisticTableTokensList.content.forEach((asset) => {
    if (Number(asset.liquidity) >= MIN_LIQUIDITY) {
      record[asset.token0Addr] = Number(asset.priceInvertedUsd);
    }
  });

  return record;
};

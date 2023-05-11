import { useQuery, UseQueryResult } from "react-query";
import Big from "big.js";
import { useCW20TokensQuery, useIBCTokensQuery } from "../tokens";
import {
  CW20TokensResponse,
  IBCTokensResponse,
  LUNA,
  Token,
} from "../../types";

const mapTokens = (tokens: Token[]): Record<string, string> => {
  return tokens.reduce((previous, current) => {
    if (current.coinGeckoId) {
      return {
        ...previous,
        [current.coinGeckoId]: current.key,
      };
    }
    return previous;
  }, {});
};

export const fetchCoinGeckoPrices = async (
  currency: string,
  cw20Tokens: CW20TokensResponse,
  ibcTokens: IBCTokensResponse
): Promise<Record<string, Big>> => {
  const tokens = {
    ...mapTokens([LUNA]),
    ...mapTokens(Object.values(cw20Tokens)),
    ...mapTokens(Object.values(ibcTokens)),
  };

  const uri = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=${currency}&ids=${Object.keys(
    tokens
  ).join(",")}`;

  const response = await fetch(uri);
  if (response.status !== 200) {
    console.log("An error occurred trying to fetch the prices");
    return {};
  }

  const data = await response.json();

  return Object.keys(data).reduce((previous, current) => {
    return {
      ...previous,
      [tokens[current]]: Big(data[current][currency]),
    };
  }, {});
};

type QuoteCurrency = "usd";

export const usePricesQuery = (
  // TODO - Come up with a better way to pass the query key
  queryName: string = "QUERY:PRICES"
): UseQueryResult<Record<string, Big>> => {
  // this should eventually come from personalization settings
  const currency: QuoteCurrency = "usd";

  const { data: cw20Tokens } = useCW20TokensQuery();

  const { data: ibcTokens } = useIBCTokensQuery();

  const FiveMinutes = 5 * 60 * 1000;

  return useQuery(
    queryName,
    () => {
      if (cw20Tokens === undefined || ibcTokens === undefined) {
        return Promise.resolve({});
      }
      return fetchCoinGeckoPrices(currency, cw20Tokens, ibcTokens);
    },
    {
      enabled: cw20Tokens !== undefined && ibcTokens !== undefined,
      refetchOnMount: false,
      refetchInterval: FiveMinutes,
    }
  );
};

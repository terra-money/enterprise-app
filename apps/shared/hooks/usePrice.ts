import Big from "big.js";
import { usePricesQuery } from "../queries";
import { Token } from "../types";

export const usePrice = (token: Token | string): Big | undefined => {
  const { data: prices = {} } = usePricesQuery();

  const key = typeof token === "string" ? token : token.key;

  return prices[key];
};

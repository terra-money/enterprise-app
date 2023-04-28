import { Big } from "big.js";

export const fromChainAmount = (amount: string | number, decimals: number) => {
  return Big(amount).div(Math.pow(10, decimals)).toNumber()
}
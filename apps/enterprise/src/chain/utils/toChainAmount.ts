import { Big } from 'big.js';

export const toChainAmount = (amount: number, decimals: number) => {
  return Big(amount).mul(Math.pow(10, decimals)).toString();
};

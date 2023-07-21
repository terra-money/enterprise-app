import { Big } from 'big.js';

export const toChainAmount = (amount: number, decimals: number) => {
  Big.PE = 100
  Big.NE = -100
  return Big(amount).mul(Math.pow(10, decimals)).toString();
};

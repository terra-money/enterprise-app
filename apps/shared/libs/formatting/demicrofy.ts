import { Big, BigSource } from 'big.js';
import { u } from '../../types';

export const demicrofy = (amount: u<BigSource> | number, decimals: number): Big => {
  return Big(amount).div(Math.pow(10, decimals));
};

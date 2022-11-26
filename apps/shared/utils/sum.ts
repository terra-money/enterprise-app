import Big from "big.js";

export const sum = (arr: Big[]): Big =>
  arr.reduce((acc, value) => acc.add(value), Big(0));

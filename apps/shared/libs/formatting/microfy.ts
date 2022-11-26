import { Big, BigSource } from "big.js";
import { NoMicro, u } from "../../types";

export const microfy = (
  amount: BigSource & NoMicro,
  decimals: number = 6
): u<Big> => {
  return Big(amount).mul(Math.pow(10, decimals)) as u<Big>;
};

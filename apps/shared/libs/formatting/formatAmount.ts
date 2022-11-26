import { Big, BigSource } from "big.js";

interface FormatAmountOptions {
  decimals: number;
}

const DEFAULT: FormatAmountOptions = {
  decimals: 2,
};

export const formatAmount = (
  amount: BigSource,
  options: FormatAmountOptions = DEFAULT
) => {
  const { decimals = DEFAULT.decimals } = options;

  const formatter = new Intl.NumberFormat("en-us", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatter.format(Big(amount).toNumber());
};

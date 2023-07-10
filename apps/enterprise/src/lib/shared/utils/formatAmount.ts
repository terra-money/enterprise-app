interface FormatAmountOptions {
  decimals: number;
}

const DEFAULT: FormatAmountOptions = {
  decimals: 2,
};

export const formatAmount = (amount: number, options: FormatAmountOptions = DEFAULT) => {
  const { decimals = DEFAULT.decimals } = options;

  const formatter = new Intl.NumberFormat('en-us', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatter.format(amount);
};

interface FormatAmountOptions {
  decimals: number;
}

const DEFAULT: FormatAmountOptions = {
  decimals: 2,
};

const million = 1000000;
const billion = 1000000000;

export const formatAmount = (amount: number, options: FormatAmountOptions = DEFAULT): string => {
  if (amount > billion) {
    return `${formatAmount(amount / billion, { decimals: 2 })}B`;
  }
  if (amount > million) {
    return `${formatAmount(amount / million, { decimals: 2 })}M`;
  }

  const { decimals = DEFAULT.decimals } = options;

  const formatter = new Intl.NumberFormat('en-us', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatter.format(amount);
};

type Format = 'round';

export const toPercents = (value: number, format?: Format, decimalPlaces?: number) => {
  const number = value * 100;
  let roundedNumber: number;

  if (format === 'round') {
    roundedNumber = Math.round(number);
  } else {
    roundedNumber = decimalPlaces !== undefined ? parseFloat(number.toFixed(decimalPlaces)) : number;
  }

  return `${roundedNumber}%`;
};

import Big, { BigSource } from 'big.js';

export function floor(number: BigSource): Big {
  const fixed = Big(number).toFixed();
  const integer = fixed.split('.')[0];
  return integer.length > 0 ? Big(integer) : Big('0');
}

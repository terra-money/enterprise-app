import Big from 'big.js';

export const getRatio = (value: Big, total: Big) => (total.eq(0) ? Big(0) : value.div(total));

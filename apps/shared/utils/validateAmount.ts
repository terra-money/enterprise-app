import Big, { BigSource } from 'big.js';

export const validateAmount = (
  value: BigSource,
  min: BigSource,
  max: BigSource | undefined,
  fieldName: string
): string | undefined => {
  if (max !== undefined && Big(value).gt(max)) {
    return `The ${fieldName} can not exceed the maximum of ${max}.`;
  }
  if (Big(value).lt(min)) {
    return `The ${fieldName} can not be less than ${min}.`;
  }
};

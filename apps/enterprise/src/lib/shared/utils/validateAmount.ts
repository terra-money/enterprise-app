export const validateAmount = (
  value: number,
  min: number,
  max: number | undefined,
  fieldName: string
): string | undefined => {
  if (max !== undefined && value > max) {
    return `The ${fieldName} can not exceed the maximum of ${max}.`;
  }
  if (value < min) {
    return `The ${fieldName} can not be less than ${min}.`;
  }
};

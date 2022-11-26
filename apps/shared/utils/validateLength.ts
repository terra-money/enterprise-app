export const validateLength = (value: string, min: number, max: number, fieldName: string): string | undefined => {
  if (value.length > max) {
    return `The ${fieldName} can not exceed the maximum of ${max} characters`;
  }
  if (value.length < min) {
    return `The ${fieldName} can not be less then ${min} characters`;
  }
  return undefined;
};

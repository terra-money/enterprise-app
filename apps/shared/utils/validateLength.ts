export const validateLength = (value: string, min: number, max: number, fieldName: string): string | undefined => {
  if (value.length > max) {
    return `The ${fieldName} must be less than ${max} characters.`;
  }
  if (value.length < min) {
    return `The ${fieldName} must be more than ${min} characters.`;
  }
  return undefined;
};

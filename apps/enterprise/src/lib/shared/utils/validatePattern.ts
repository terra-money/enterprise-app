export const validatePattern = (input: string, regex: RegExp, message: string) => {
  return regex.test(input) ? undefined : message;
};

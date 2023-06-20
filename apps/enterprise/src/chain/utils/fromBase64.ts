export const fromBase64 = (value: string) => {
  return JSON.parse(Buffer.from(value, 'base64').toString());
};
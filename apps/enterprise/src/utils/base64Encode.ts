export const base64Encode = (msg: any): string => {
  return Buffer.from(JSON.stringify(msg)).toString('base64');
};

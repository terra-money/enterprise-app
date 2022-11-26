export const hookMsg = (msg: object) => {
  return Buffer.from(JSON.stringify(msg)).toString("base64");
};

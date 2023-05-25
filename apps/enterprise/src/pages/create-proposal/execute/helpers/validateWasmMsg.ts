export const validateWasmMsg = (msg: string) => {
  if (!msg) {
    return 'Enter a message';
  }

  try {
    JSON.parse(msg);
  } catch (err) {
    return 'Message format invalid.';
  }
};

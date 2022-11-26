export const validateWasmMsg = (msg: string) => {
  if (!msg) {
    return 'Message is required';
  }

  try {
    JSON.parse(msg);
  } catch (err) {
    return 'Message format invalid.';
  }
};

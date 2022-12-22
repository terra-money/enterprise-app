export const enforceTextInputIntoNumber = (input: string) => {
  if (input === '') {
    return;
  }

  const newValue = Number(input);
  if (isNaN(newValue) || newValue < 0) {
    return;
  }

  return newValue;
};

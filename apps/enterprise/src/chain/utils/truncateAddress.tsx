export const truncateAddress = (text: string, [h, t]: [number, number] = [6, 6]) => {
  const head = text.slice(0, h);
  const tail = text.slice(-1 * t, text.length);
  return text.length > h + t ? [head, tail].join('...') : text;
};

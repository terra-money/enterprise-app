export const getFinderUrl = (network: string, txHash: string) =>
  `https://finder.terra.money/${network}/tx/${txHash}`;

import { useConnectedWallet, useWallet } from '@terra-money/wallet-kit';

export const supportedChains = ['phoenix-1', 'pisco-1'];
export type ChainID = (typeof supportedChains)[number];

export const useChainID = (): ChainID => {
  const { network } = useWallet();
  const connectedWallet = useConnectedWallet();

  const chains = Object.keys(connectedWallet ? connectedWallet.addresses : network);

  const selectedChainID = chains.find((chainID) => supportedChains.includes(chainID)) as ChainID;

  return selectedChainID;
};

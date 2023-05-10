import { useWallet } from "@terra-money/wallet-provider"

export const supportedChains = ['phoenix-1', 'pisco-1']
export type ChainID = typeof supportedChains[number]

export const useChainID = (): ChainID => {
  const { network } = useWallet()

  const selectedChainID = Object.keys(network).find((chainID) => supportedChains.includes(chainID)) as ChainID

  return selectedChainID
}
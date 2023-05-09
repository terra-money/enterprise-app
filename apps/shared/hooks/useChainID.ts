import { useWallet } from "@terra-money/wallet-provider"

export const supportedChains = ['phoenix-1', 'pisco-1']
export type ChainID = typeof supportedChains[number]

export const useChainID = (): ChainID => {
  const { network } = useWallet()

  if (!network) return supportedChains[0]

  return Object.values(network)[0].chainID
}
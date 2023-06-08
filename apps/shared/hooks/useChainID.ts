import { useConnectedWallet, useWallet } from "@terra-money/wallet-provider"

export const supportedChains = ['phoenix-1', 'pisco-1']
export type ChainID = typeof supportedChains[number]

export const useChainID = (): ChainID => {
  const connectedWallet = useConnectedWallet()
  // If there is a connected wallet with networks
  // use the connected wallet networks otherwise
  // default to the available networks to get the chainID 
  const network =  connectedWallet?.network 
    ? connectedWallet.network
    : useWallet().network;

  const chains = Object.keys(network)

  const selectedChainID = chains.find(chainID=> supportedChains.includes(chainID)) as ChainID

  return selectedChainID
}
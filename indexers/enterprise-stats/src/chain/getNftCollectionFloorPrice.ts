import memoize from 'memoizee'
import { getFloorPricesOfSupportedNFTCollections } from './getFloorPricesOfSupportedNFTCollections';

export const getNFTCollectionFloorPrice = memoize(async (address: string): Promise<number | null> => {
  const record = await getFloorPricesOfSupportedNFTCollections()

  return record[address]
})
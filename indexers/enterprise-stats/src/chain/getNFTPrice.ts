import { NFT } from "./NFT";
import { getNFTCollectionFloorPrice } from "./getNftCollectionFloorPrice";
import { getNFTsPrices } from "./getNFTsPrices";

export const getNFTPrice = async (nft: NFT): Promise<number | null> => {
  try {
    const prices = await getNFTsPrices(nft.address)

    return prices[nft.id] || 0
  } catch (err) {
    console.error(`Error getting price for NFT collection=${nft.address} id=${nft.id}`, err.toString())
  }

  return getNFTCollectionFloorPrice(nft.address)
}
export interface NFT {
  address: string;
  id: string;
}

export interface NFTWithPrice extends NFT {
  usd: number;
}
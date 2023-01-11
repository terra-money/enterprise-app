import { base64Encode } from 'utils';

// Mint NFT Message: https://github.com/CosmWasm/cw-nfts/blob/main/contracts/cw721-base/src/msg.rs#L52
// NFT Metadata: https://github.com/CosmWasm/cw-nfts/tree/main/contracts/cw721-metadata-onchain
export interface MintNftMsgParams {
  contract: string;

  tokenId: string;
  owner: string;

  tokenUri?: string;
  imageUrl?: string;
  // imageData?: string;
  // externalUrl?: string;
  // description?: string;
  // name?: string;
  // backgroundColor?: string;
  // animationUrl?: string;
  // youtubeUrl?: string;
  // attributes?: any;
}

interface Trait {
  display_type?: string;
  trait_type: string;
  value: string;
}

interface NftMetadata {
  image?: string;
  image_data?: string;
  external_url?: string;
  description?: string;
  name?: string;
  attributes?: Trait[];
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
}

interface MintNftMsg {
  token_id: string;
  owner: string;
  token_uri?: string;
  extension: NftMetadata;
}

export const toMintNftMsg = ({ contract, tokenId, owner, tokenUri, imageUrl }: MintNftMsgParams) => {
  const msg: MintNftMsg = {
    token_id: tokenId,
    owner,
    token_uri: tokenUri,
    extension: {
      image: imageUrl,
    },
  };

  return JSON.stringify({
    wasm: {
      execute: {
        contract_addr: contract,
        funds: [],
        msg: base64Encode(msg),
      },
    },
  });
};

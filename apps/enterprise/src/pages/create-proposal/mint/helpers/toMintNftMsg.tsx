import { MintCW721Msg } from 'chain/CW721';
import { base64Encode } from 'utils';

// Mint NFT Message: https://github.com/CosmWasm/cw-nfts/blob/main/contracts/cw721-base/src/msg.rs#L52
// NFT Metadata: https://github.com/CosmWasm/cw-nfts/tree/main/contracts/cw721-metadata-onchain
export interface MintNftMsgParams {
  contract: string;

  tokenId: string;
  owner: string;

  tokenUri?: string;
  imageUrl?: string;
  imageData?: string;
  externalUrl?: string;
  // description?: string;
  // name?: string;
  // backgroundColor?: string;
  // animationUrl?: string;
  // youtubeUrl?: string;
  // attributes?: any;
}

export const toMintNftMsg = ({
  contract,
  tokenId,
  owner,
  tokenUri,
  imageUrl,
  imageData,
  externalUrl,
}: MintNftMsgParams) => {
  const mint: MintCW721Msg = {
    mint: {
      token_id: tokenId,
      owner,
      token_uri: tokenUri,
      extension: {
        image: imageUrl,
        image_data: imageData,
        external_url: externalUrl,
      },
    }
  };

  return JSON.stringify({
    wasm: {
      execute: {
        contract_addr: contract,
        funds: [],
        msg: base64Encode({ mint }),
      },
    },
  });
};

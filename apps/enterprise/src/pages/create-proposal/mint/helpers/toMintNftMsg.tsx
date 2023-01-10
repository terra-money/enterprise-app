import { base64Encode } from 'utils';

export interface MintNftMsgParams {
  contract: string;

  tokenId: string;
  owner: string;
  // optional
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

export const toMintNftMsg = ({ contract, ...mint }: MintNftMsgParams) => {
  return JSON.stringify({
    wasm: {
      execute: {
        contract_addr: contract,
        funds: [],
        msg: base64Encode({
          mint,
        }),
      },
    },
  });
};

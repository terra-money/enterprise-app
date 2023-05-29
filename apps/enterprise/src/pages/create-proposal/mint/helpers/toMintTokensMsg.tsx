import { microfy } from '@terra-money/apps/libs/formatting';
import { base64Encode } from 'utils';

interface ToMintTokensMsgParams {
  tokenAddress: string;
  recepientAddress: string;
  amount: number;
  tokenDecimals: number;
}

export interface MintTokenMsg {
  recipient: string;
  amount: string;
}

export const toMintTokenMsg = ({ tokenAddress, recepientAddress, amount, tokenDecimals }: ToMintTokensMsgParams) => {
  const mint: MintTokenMsg = {
    recipient: recepientAddress,
    amount: microfy(amount, tokenDecimals).toString(),
  };
  return JSON.stringify({
    wasm: {
      execute: {
        contract_addr: tokenAddress,
        funds: [],
        msg: base64Encode({
          mint,
        }),
      },
    },
  });
};

import { microfy } from '@terra-money/apps/libs/formatting';
import { base64Encode } from 'utils';

export type AssetType = 'native' | 'cw20';

interface ToMintTokensMsgParams {
  tokenAddress: string;
  recepientAddress: string;
  amount: number;
  tokenDecimals: number;
}

export const toMintTokenMsg = ({ tokenAddress, recepientAddress, amount, tokenDecimals }: ToMintTokensMsgParams) => {
  return JSON.stringify({
    wasm: {
      execute: {
        contract_addr: tokenAddress,
        funds: [],
        msg: base64Encode({
          mint: {
            recipient: recepientAddress,
            amount: microfy(amount, tokenDecimals).toString(),
          },
        }),
      },
    },
  });
};

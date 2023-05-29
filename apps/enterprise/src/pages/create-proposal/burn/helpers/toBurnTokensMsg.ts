import { microfy } from '@terra-money/apps/libs/formatting';
import { base64Encode } from 'utils';

interface ToSpendTreasuryMsgParams {
  amount: number;
  tokenDecimals: number;
  tokenAddress: string;
}

export interface BurnTokenMsg {
  amount: string;
}

export const toBurnTokensMsg = ({ amount, tokenDecimals, tokenAddress }: ToSpendTreasuryMsgParams) => {
  const burn: BurnTokenMsg = {
    amount: microfy(amount, tokenDecimals).toString(),
  };
  return JSON.stringify({
    wasm: {
      execute: {
        contract_addr: tokenAddress,
        funds: [],
        msg: base64Encode({
          burn,
        }),
      },
    },
  });
};

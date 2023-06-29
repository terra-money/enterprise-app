import { microfy } from '@terra-money/apps/libs/formatting';
import { BurnCW20Msg } from 'chain/CW20';
import { base64Encode } from 'utils';

interface ToSpendTreasuryMsgParams {
  amount: number;
  tokenDecimals: number;
  tokenAddress: string;
}

export const toBurnTokensMsg = ({ amount, tokenDecimals, tokenAddress }: ToSpendTreasuryMsgParams) => {
  const msg: BurnCW20Msg = {
    burn: {
      amount: microfy(amount, tokenDecimals).toString(),
    }
  }

  return JSON.stringify({
    wasm: {
      execute: {
        contract_addr: tokenAddress,
        funds: [],
        msg: base64Encode(msg),
      },
    },
  });
};

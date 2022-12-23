import { microfy } from '@terra-money/apps/libs/formatting';
import { base64Encode } from 'utils';

interface ToSpendTreasuryMsgParams {
  amount: number;
  tokenDecimals: number;
}

export const toBurnTokensMsg = ({ amount, tokenDecimals }: ToSpendTreasuryMsgParams) => {
  return JSON.stringify({
    wasm: {
      execute: {
        contract_addr: '<insert_dao_token_address>',
        funds: [],
        msg: base64Encode({
          burn: {
            amount: microfy(amount, tokenDecimals).toString(),
          },
        }),
      },
    },
  });
};

import { microfy } from '@terra-money/apps/libs/formatting';
import { AssetType } from 'chain';
import { base64Encode } from 'utils';

interface ToSpendTreasuryMsgParams {
  destinationAddress: string;
  amount: number;
  assetDecimals: number;
  // denom for native or contract for cw20
  assetId: string;
  assetType: AssetType;
}

export const toSpendTreasuryMsg = ({
  destinationAddress,
  amount,
  assetDecimals,
  assetId,
  assetType,
}: ToSpendTreasuryMsgParams) => {
  if (assetType === 'native') {
    return JSON.stringify({
      bank: {
        send: {
          to_address: destinationAddress,
          amount: {
            denom: assetId,
            amount: microfy(amount, assetDecimals).toString(),
          },
        },
      },
    });
  }

  return JSON.stringify({
    wasm: {
      execute: {
        contract_addr: assetId,
        funds: [],
        msg: base64Encode({
          transfer: {
            recipient: destinationAddress,
            amount: microfy(amount, assetDecimals).toString(),
          },
        }),
      },
    },
  });
};

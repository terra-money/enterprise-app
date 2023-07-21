import { toChainAmount } from 'chain/utils/toChainAmount';
import { AssetType } from 'chain';
import { TransferCW20Msg } from 'chain/CW20';
import { BankSendMsg } from 'chain/CosmWasm';
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
    const msg: BankSendMsg = {
      bank: {
        send: {
          to_address: destinationAddress,
          amount: [
            {
              denom: assetId,
              amount: toChainAmount(amount, assetDecimals),
            },
          ],
        },
      },
    };

    return JSON.stringify(msg);
  }

  const msg: TransferCW20Msg = {
    transfer: {
      recipient: destinationAddress,
      amount: toChainAmount(amount, assetDecimals),
    },
  };

  return JSON.stringify({
    wasm: {
      execute: {
        contract_addr: assetId,
        funds: [],
        msg: base64Encode(msg),
      },
    },
  });
};

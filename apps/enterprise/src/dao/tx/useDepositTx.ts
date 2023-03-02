import { useTx } from '@terra-money/apps/libs/transactions';
import { MsgExecuteContract, MsgSend } from '@terra-money/terra.js';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { TX_KEY } from 'tx';
import { isDenom, toAmount } from "@terra.kitchen/utils"

interface DepositTxParams {
  address: string;
  amount: number;
  decimals: number;
  denom: string;
}

export const useDepositTx = () => {
  const walletAddress = useAssertMyAddress();

  return useTx<DepositTxParams>(
    ({ address, amount, decimals, denom }) => {
      const msgs = isDenom(denom)
        ? [
          new MsgSend(
            walletAddress,
            address,
            toAmount(amount, { decimals })
          ),
        ]
        : [
          new MsgExecuteContract(
            walletAddress,
            denom,
            { transfer: { recipient: address, amount: toAmount(amount, { decimals }) } }
          ),
        ]

      return {
        msgs
      };
    },
    {
      txKey: TX_KEY.DEPOSIT,
    }
  );
};

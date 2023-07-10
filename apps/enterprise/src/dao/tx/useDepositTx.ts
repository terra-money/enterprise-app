import { useTx } from 'chain/transactions';
import { MsgExecuteContract, MsgSend } from '@terra-money/feather.js';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { TX_KEY } from 'tx';
import { isDenom, toAmount } from '@terra.kitchen/utils';
import { useChainID } from 'chain/hooks/useChainID';

interface DepositTxParams {
  address: string;
  amount: number;
  decimals: number;
  denom: string;
}

export const useDepositTx = () => {
  const walletAddress = useAssertMyAddress();

  const chainID = useChainID();

  return useTx<DepositTxParams>(
    ({ address, amount, decimals, denom }) => {
      const msgs = isDenom(denom)
        ? [new MsgSend(walletAddress, address, { [denom]: toAmount(amount, { decimals }) })]
        : [
            new MsgExecuteContract(walletAddress, denom, {
              transfer: { recipient: address, amount: toAmount(amount, { decimals }) },
            }),
          ];

      return {
        chainID,
        msgs,
      };
    },
    {
      txKey: TX_KEY.DEPOSIT,
    }
  );
};

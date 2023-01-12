import { microfy } from '@terra-money/apps/libs/formatting';
import { TxBuilder, useTx } from '@terra-money/apps/libs/transactions';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { TX_KEY } from 'tx';

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
      const tx = TxBuilder.new()
        .send(walletAddress, address, { [denom]: microfy(amount, decimals).toString() })
        .build();

      return {
        ...tx,
      };
    },
    {
      txKey: TX_KEY.DEPOSIT,
    }
  );
};

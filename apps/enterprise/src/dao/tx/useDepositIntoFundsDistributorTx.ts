import { useTx } from 'chain/transactions';
import { MsgExecuteContract } from '@terra-money/feather.js';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { TX_KEY } from 'tx';
import { isDenom, toAmount } from '@terra.kitchen/utils';
import { funds_distributor } from 'types/contracts';
import { hookMsg } from 'chain/transactions/utils/hookMsg';
import { useChainID } from 'chain/hooks/useChainID';

interface DepositTxParams {
  address: string;
  amount: number;
  decimals: number;
  denom: string;
}

// docs: https://github.com/CosmWasm/cw-plus/blob/main/packages/cw20/README.md#messages
interface SendCW20Msg {
  send: {
    contract: string;
    amount: string;
    msg: string;
  };
}

const getMsg = ({ address, amount, decimals, denom, walletAddress }: DepositTxParams & { walletAddress: string }) => {
  if (isDenom(denom)) {
    const msg: funds_distributor.ExecuteMsg = {
      distribute_native: {},
    };
    return new MsgExecuteContract(walletAddress, address, msg, { [denom]: toAmount(amount, { decimals }) });
  }

  const fundsDistributorHookMsg: funds_distributor.Cw20HookMsg = {
    distribute: {},
  };
  const msg: SendCW20Msg = {
    send: {
      contract: address,
      amount: toAmount(amount, { decimals }),
      msg: hookMsg(fundsDistributorHookMsg),
    },
  };

  return new MsgExecuteContract(walletAddress, denom, msg);
};

export const useDepositIntoFundsDistributorTx = () => {
  const walletAddress = useAssertMyAddress();
  const chainID = useChainID();

  return useTx<DepositTxParams>(
    (params) => {
      return {
        chainID,
        msgs: [getMsg({ ...params, walletAddress })],
      };
    },
    {
      txKey: TX_KEY.DEPOSIT_INTO_FUNDS_DISTRIBUTOR,
    }
  );
};

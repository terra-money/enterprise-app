import { LCDClient } from "@terra-money/feather.js";
import { TxAsyncThunkAction } from ".";
import { TransactionStatus } from "../types";
import { find } from "../utils/find";
import { trackTx } from "./trackTx";

const trackTxAction = (txHash: string, lcd: LCDClient, chainID: string): TxAsyncThunkAction => {
  return async (dispatch, getState, args) => {
    const transaction = find(getState(), txHash);
    if (transaction && transaction.status === TransactionStatus.Pending) {
      await trackTx(txHash, lcd, dispatch, getState, args, chainID);
    }
  };
};

export { trackTxAction };

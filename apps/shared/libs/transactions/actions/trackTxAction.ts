import { LCDClient } from "@terra-money/terra.js";
import { TxAsyncThunkAction } from ".";
import { TransactionStatus } from "../types";
import { find } from "../utils/find";
import { trackTx } from "./trackTx";

const trackTxAction = (txHash: string, lcd: LCDClient): TxAsyncThunkAction => {
  return async (dispatch, getState, args) => {
    const transaction = find(getState(), txHash);
    if (transaction && transaction.status === TransactionStatus.Pending) {
      await trackTx(txHash, lcd, dispatch, getState, args);
    }
  };
};

export { trackTxAction };

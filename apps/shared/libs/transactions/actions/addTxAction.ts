import { LCDClient } from "@terra-money/feather.js";
import { ActionType, TxAsyncThunkAction } from ".";
import { TransactionPayload } from "../types";
import { trackTx } from "./trackTx";

const addTxAction = (
  txHash: string,
  payload: TransactionPayload,
  lcd: LCDClient,
  chainID: string
): TxAsyncThunkAction => {
  return async (dispatch, getState, args) => {
    dispatch({
      type: ActionType.Add,
      payload: {
        txHash,
        payload,
      },
    });

    await trackTx(txHash, lcd, dispatch, getState, args, chainID);
  };
};

export { addTxAction };

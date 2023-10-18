import { LCDClient } from "@terra-money/feather.js";
import { ActionType, TxAsyncThunkAction } from ".";
import { TransactionPayload } from "../types";
const addTxAction = (
  txHash: string,
  payload: TransactionPayload,
  lcd: LCDClient,
  chainID: string
): TxAsyncThunkAction => {
  return async (dispatch) => {
    dispatch({
      type: ActionType.Add,
      payload: {
        txHash,
        payload,
      },
    });

    // await trackTx(txHash, lcd, dispatch, getState, args, chainID);
  };
};

export { addTxAction };

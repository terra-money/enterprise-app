import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TxState } from "../TxState";
import { Transaction } from "../types";
import { BehaviorSubject } from "rxjs";
import { TxLog } from "@terra-money/feather.js";

export enum ActionType {
  Add,
  Delete,
  Complete,
  Failed,
  ClearAll,
}

type AddTxAction = {
  type: ActionType.Add;
  payload: Pick<Transaction, "txHash" | "payload">;
};

type DeleteTxAction = {
  type: ActionType.Delete;
  payload: Pick<Transaction, "txHash">;
};

type CompleteTxAction = {
  type: ActionType.Complete;
  payload: Pick<Transaction, "txHash"> & {
    height: number;
    logs: TxLog[];
  };
};

type FailedTxAction = {
  type: ActionType.Failed;
  payload: Pick<Transaction, "txHash"> & {
    error: Error;
  };
};

type ClearAllAction = {
  type: ActionType.ClearAll;
};

export type TxAction =
  | AddTxAction
  | DeleteTxAction
  | CompleteTxAction
  | FailedTxAction
  | ClearAllAction;

export interface TxThunkArgument {
  pending: BehaviorSubject<Transaction>;
  completed: BehaviorSubject<Transaction>;
  cancelled: BehaviorSubject<Transaction>;
  failed: BehaviorSubject<Transaction>;
}

export type TxDispatch = ThunkDispatch<TxState, TxThunkArgument, TxAction>;

export type TxThunkAction = ThunkAction<
  void,
  TxState,
  TxThunkArgument,
  TxAction
>;

export type TxAsyncThunkAction = ThunkAction<
  Promise<void>,
  TxState,
  TxThunkArgument,
  TxAction
>;

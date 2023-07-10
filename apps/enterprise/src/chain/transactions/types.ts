import { TxLog } from "@terra-money/feather.js";
import {
  CreateTxFailed,
  SignBytesFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-money/wallet-provider";

export enum TransactionStatus {
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
}

export type TransactionPayload = {
  [key: string]: any;
};

type TransactionBase = {
  txHash: string;
  createdAt: number;
  payload: TransactionPayload;
};

export type PendingTransaction = TransactionBase & {
  status: TransactionStatus.Pending;
};

export type CompletedTransaction = TransactionBase & {
  status: TransactionStatus.Completed;
  height: number;
  logs: TxLog[];
};

export type FailedTransaction = {
  txHash: string | "";
  status: TransactionStatus.Failed;
  payload: TransactionPayload;
  error:
  | Error
  | UserDenied
  | Timeout
  | SignBytesFailed
  | CreateTxFailed
  | TxFailed
  | TxUnspecifiedError;
};

export type Transaction =
  | PendingTransaction
  | CompletedTransaction
  | FailedTransaction;

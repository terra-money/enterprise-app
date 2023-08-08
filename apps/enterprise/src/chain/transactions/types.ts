import { TxLog } from '@terra-money/feather.js';

export enum TransactionStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
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
  txHash: string | '';
  status: TransactionStatus.Failed;
  payload: TransactionPayload;
  error: Error;
};

export type Transaction = PendingTransaction | CompletedTransaction | FailedTransaction;

export interface TxEvent {
  type: string;
  attributes: {
    key: string;
    value: string;
  }[];
}

type Message = any;

interface Tx {
  body: {
    messages: Message[];
    memo?: string;
  };
  auth_info: {
    fee: any;
  };
}

export interface TxResponse {
  height: number;
  txhash: string;
  raw_log: string;
  logs: TxLog[] | undefined;
  gas_wanted: number;
  gas_used: number;
  tx: Tx;
  timestamp: string;
  code?: number | undefined;
  codespace?: string | undefined;
}

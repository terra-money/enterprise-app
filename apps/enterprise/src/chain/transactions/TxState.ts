import { Transaction } from "./types";

export interface TxState {
  initialized: boolean;
  transactions: Transaction[];
}

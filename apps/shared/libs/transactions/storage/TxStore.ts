import { Transaction } from "..";

export interface TxStore {
  read(): Transaction[];
  write(transactions: Transaction[]): void;
}

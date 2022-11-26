import { TxState } from "../TxState";
import { Transaction } from "../types";

export const find = (
  state: TxState,
  txHash: string
): Transaction | undefined => {
  return state.transactions.find(
    (transaction) => transaction.txHash.toLowerCase() === txHash.toLowerCase()
  );
};

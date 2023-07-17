import { useMemo } from "react";
import { Transaction } from ".";
import { useTransactionsContext } from "./TransactionsProvider";
import { TransactionStatus } from "./types";

const useTransactions = (status?: TransactionStatus): Transaction[] => {
  const [state] = useTransactionsContext();
  return useMemo(() => {
    if (status === undefined) {
      return state.transactions;
    }
    return state.transactions.filter((tx) => tx.status === status);
  }, [status, state.transactions]);
};

export { useTransactions };

import { Transaction } from ".";
import { useTransactions } from "./useTransactions";

const useTransaction = (txHash: string): Transaction | undefined => {
  const transactions = useTransactions();
  return transactions.find((transaction) => transaction.txHash === txHash);
};

export { useTransaction };

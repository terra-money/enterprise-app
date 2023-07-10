import { TxState } from "./TxState";
import { ActionType, TxAction } from "./actions";
import { CompletedTransaction, TransactionStatus } from "./types";

const transactionsReducer = (state: TxState, action: TxAction): TxState => {
  switch (action.type) {
    case ActionType.Add:
      return {
        ...state,
        transactions: [
          ...state.transactions,
          {
            status: TransactionStatus.Pending,
            createdAt: Date.now(),
            ...action.payload,
          },
        ],
      };
    case ActionType.Delete:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.txHash !== action.payload.txHash
        ),
      };
    case ActionType.Complete:
      return {
        ...state,
        transactions: state.transactions.map((transaction) => {
          if (transaction.txHash === action.payload.txHash) {
            return {
              ...transaction,
              ...action.payload,
              status: TransactionStatus.Completed,
            } as CompletedTransaction;
          }
          return transaction;
        }),
      };
    case ActionType.Failed:
      return {
        ...state,
        transactions: state.transactions.map((transaction) => {
          if (transaction.txHash === action.payload.txHash) {
            return {
              ...transaction,
              ...action.payload,
              status: TransactionStatus.Failed,
            };
          }
          return transaction;
        }),
      };
    case ActionType.ClearAll:
      return {
        ...state,
        transactions: [],
      };
  }
  return state;
};

export { transactionsReducer };

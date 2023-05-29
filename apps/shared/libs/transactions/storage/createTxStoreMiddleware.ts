import { TxAction, TxDispatch } from "../actions";
import { Transaction } from "../types";
import { TxStore } from "./TxStore";

const createTxStoreMiddleware =
  (store: TxStore) =>
    ({ getState }: any) => {
      return (next: TxDispatch) => {
        return (action: TxAction) => {
          const nextAction = next(action);

          const { transactions } = getState();
          // TODO: temporary fix for the issue with undefined trasnsactions
          const transactionsToWrite = (transactions as Transaction[]).filter(tx => tx);
          if (transactions.length !== transactionsToWrite.length) {
            console.log(`${action} introduced an undefined transaction`)
          }
          store.write(transactionsToWrite);

          return nextAction;
        };
      };
    };

export { createTxStoreMiddleware };

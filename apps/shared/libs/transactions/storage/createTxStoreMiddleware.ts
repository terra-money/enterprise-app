import { TxAction, TxDispatch } from "../actions";
import { TxStore } from "./TxStore";

const createTxStoreMiddleware =
  (store: TxStore) =>
  ({ getState }: any) => {
    return (next: TxDispatch) => {
      return (action: TxAction) => {
        const nextAction = next(action);

        const { transactions } = getState();
        store.write(transactions);

        return nextAction;
      };
    };
  };

export { createTxStoreMiddleware };

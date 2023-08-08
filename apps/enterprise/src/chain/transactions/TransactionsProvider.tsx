import { createReducer } from 'react-use';
import thunk from 'redux-thunk';
import { transactionsReducer } from './transactionsReducer';
import { TxDispatch, trackTxAction } from './actions';
import { TxState } from './TxState';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { LocalStorageTxStore } from './storage/LocalStorageTxStore';
import { createTxStoreMiddleware } from './storage';
import { pendingSubject, completedSubject, cancelledSubject, failedSubject } from './rx';
import { useLcdClient } from '@terra-money/wallet-kit';
import { CompletedTransaction, FailedTransaction, PendingTransaction, TransactionStatus } from './types';
import { useChainID } from 'chain/hooks/useChainID';
import { ComponentWithChildrenProps } from 'lib/shared/props';

const storage = new LocalStorageTxStore('__tx_store');

const useThunkReducer = createReducer<any, TxState>(
  thunk.withExtraArgument({
    pending: pendingSubject,
    completed: completedSubject,
    cancelled: cancelledSubject,
    failed: failedSubject,
  }),
  createTxStoreMiddleware(storage)
);

const initialState = {
  initialized: false,
  transactions: [],
};

type TxEventHandlers = {
  onPending?: (transaction: PendingTransaction) => void;
  onCompleted?: (transaction: CompletedTransaction) => void;
  onCancelled?: (transaction: PendingTransaction) => void;
  onFailed?: (transaction: FailedTransaction) => void;
};

type TxHelpers = {
  setEventHandlers: (eventHandlers: TxEventHandlers) => void;
};

const TransactionsContext = createContext<[TxState, TxDispatch, TxHelpers] | undefined>(undefined);

const useTransactionsContext = (): [TxState, TxDispatch, TxHelpers] => {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw Error('The TransactionsContext has not been defined.');
  }
  return context;
};

const TransactionsProvider = (props: ComponentWithChildrenProps) => {
  const { children } = props;

  const [{ onPending, onCancelled, onCompleted, onFailed }, setEventHandlers] = useState<TxEventHandlers>({});

  const lcd = useLcdClient();

  const chainID = useChainID();

  const value = useThunkReducer(transactionsReducer, initialState, (state) => {
    return {
      ...state,
      initialized: true,
      // TODO: temporary fix for the issue with undefined trasnsactions
      transactions: storage.read().filter((tx) => tx),
    };
  });

  // update the tracking status of the outstanding txs
  useEffect(() => {
    const [state, dispatch] = value;
    if (state.initialized) {
      state.transactions.forEach((transaction) => {
        if (transaction.status === TransactionStatus.Pending) {
          dispatch(trackTxAction(transaction.txHash, lcd, chainID));
        }
      });
    }
  }, [chainID, lcd, value]);

  useEffect(() => {
    const pending = pendingSubject.subscribe((transaction) => {
      if (onPending && transaction.status === TransactionStatus.Pending) {
        onPending(transaction);
      }
    });

    const completed = completedSubject.subscribe((transaction) => {
      if (onCompleted && transaction.status === TransactionStatus.Completed) {
        onCompleted(transaction);
      }
    });

    const cancelled = cancelledSubject.subscribe((transaction) => {
      if (onCancelled && transaction.status === TransactionStatus.Pending) {
        onCancelled(transaction);
      }
    });

    const failed = failedSubject.subscribe((transaction) => {
      if (onFailed && transaction.status === TransactionStatus.Failed) {
        onFailed(transaction);
      }
    });

    return () => {
      pending.unsubscribe();
      completed.unsubscribe();
      cancelled.unsubscribe();
      failed.unsubscribe();
    };
  }, [onCompleted, onCancelled, onFailed, onPending]);

  const newValue = useMemo(() => {
    return [value[0], value[1], { setEventHandlers }] as [TxState, TxDispatch, TxHelpers];
  }, [value, setEventHandlers]);

  return <TransactionsContext.Provider value={newValue}>{children}</TransactionsContext.Provider>;
};

export { TransactionsProvider, useTransactionsContext };

import { useEffect } from 'react';
import { pendingSubject, completedSubject, cancelledSubject, failedSubject } from './rx';
import { CompletedTransaction, FailedTransaction, PendingTransaction, Transaction, TransactionStatus } from './types';
import { RefCallback } from './utils/useRefCallback';

type Callback<T extends Transaction> = (transaction: T) => void;

interface TransactionSubscribersOptions {
  onPending?: RefCallback<Callback<PendingTransaction>>;
  onCompleted?: RefCallback<Callback<CompletedTransaction>>;
  onCancelled?: RefCallback<Callback<PendingTransaction>>;
  onFailed?: RefCallback<Callback<FailedTransaction>>;
}

export const useTransactionSubscribers = (options: TransactionSubscribersOptions) => {
  const { onPending, onCompleted, onCancelled, onFailed } = options;

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
};

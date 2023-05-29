import { FailedTransaction, Transaction, TransactionStatus } from '@terra-money/apps/libs/transactions';
import { ReactComponent as CheckIcon } from 'components/assets/Check.svg';
import { ReactComponent as ErrorIcon } from 'components/assets/Error.svg';
import { ReactComponent as TimerIcon } from 'components/assets/Timer.svg';
import { ReactComponent as CloseIcon } from 'components/assets/Close.svg';
import { Text } from 'components/primitives/text';
import { useSnackbar } from 'notistack';
import { useSnackbarKey } from './SnackbarContainer';
import { UserDenied } from '@terra-money/wallet-provider';
import { useCallback } from 'react';
import { LinearProgress } from '@mui/material';
import { getFinderUrl } from '@terra-money/apps/utils';
import styles from './TransactionSnackbar.module.sass';
import { useTransactionError } from 'chain/components/TransactionErrorProvider';
import { useNetworkName } from '@terra-money/apps/hooks';
import { useMyAddress } from 'chain/hooks/useMyAddress';

type Variant = 'pending' | 'completed' | 'failed';

interface TransactionSnackbarProps {
  transaction: Transaction;
  variant: Variant;
  message: string;
  timeout?: number;
}

const getErrorText = (error: FailedTransaction['error']) => {
  if (error instanceof UserDenied) {
    return error.message;
  }

  return 'View error details';
};

export const TransactionSnackbar = (props: TransactionSnackbarProps) => {
  const { transaction, variant, message } = props;

  const { closeSnackbar } = useSnackbar();

  const snackbarKey = useSnackbarKey();

  const myAddress = useMyAddress();

  const { showDetails: showTransactionErrorDetails } = useTransactionError();

  const networkName = useNetworkName();

  const onDetailsClick = useCallback(() => {
    if (!myAddress) {
      return;
    }

    if (transaction.txHash.length === 0 && transaction.status === TransactionStatus.Failed) {
      showTransactionErrorDetails(transaction.error.message.slice(0, 500));
      return;
    }

    window.open(getFinderUrl(networkName, transaction.txHash));
  }, [myAddress, networkName, showTransactionErrorDetails, transaction]);

  return (
    <div className={styles.root} data-variant={variant}>
      {variant === 'pending' && <LinearProgress className={styles.progress} color="inherit" />}
      {variant === 'completed' && <CheckIcon className={styles.icon} />}
      {variant === 'failed' && <ErrorIcon className={styles.icon} />}
      {variant === 'pending' && <TimerIcon className={styles.icon} />}
      <Text className={styles.text} variant="heading4">
        {message}
      </Text>
      {transaction.txHash?.length > 0 ? (
        <Text className={styles.link} variant="link" onClick={onDetailsClick}>
          View details
        </Text>
      ) : (
        <Text className={styles.link} variant="link" onClick={onDetailsClick}>
          {transaction.status === TransactionStatus.Failed && transaction.error
            ? getErrorText(transaction.error)
            : 'View details'}
        </Text>
      )}
      {variant !== 'pending' && <CloseIcon className={styles.close} onClick={() => closeSnackbar(snackbarKey)} />}
    </div>
  );
};

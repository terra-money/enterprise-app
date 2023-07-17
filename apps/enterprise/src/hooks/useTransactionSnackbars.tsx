import {
  CompletedTransaction,
  FailedTransaction,
  PendingTransaction,
  useTransactionSubscribers,
} from 'chain/transactions';
import { useSnackbar } from 'notistack';
import { useRefetchQueries } from 'queries';
import { TX_KEY } from 'tx';
import { TransactionSnackbar } from 'components/snackbar';
import { indexerCompletion } from 'utils/indexerCompletion';
import { useRefCallback } from 'chain/transactions/utils/useRefCallback';
import { useNetworkName } from 'chain/hooks/useNetworkName';

type TxMessages = Record<TX_KEY, string>;

const CompletedSnackbarMessages: TxMessages = {
  [TX_KEY.CREATE_DAO]: 'Your DAO was created successfully.',
  [TX_KEY.STAKE_TOKEN]: 'Your tokens are staked.',
  [TX_KEY.UNSTAKE_TOKEN]: 'Your tokens were unstaked.',
  [TX_KEY.STAKE_NFT]: 'Your NFTs were staked.',
  [TX_KEY.UNSTAKE_NFT]: 'Your NFTs were unstaked.',
  [TX_KEY.CLAIM]: 'Your tokens were claimed.',
  [TX_KEY.CREATE_PROPOSAL]: 'Your proposal was created.',
  [TX_KEY.EXECUTE_PROPOSAL]: 'The proposal was executed.',
  [TX_KEY.CAST_VOTE]: 'Your vote was cast.',
  [TX_KEY.DEPOSIT]: 'Your tokens were deposited.',
  [TX_KEY.DEPOSIT_INTO_FUNDS_DISTRIBUTOR]: 'Your tokens were deposited.',
  [TX_KEY.CLAIM_REWARDS]: 'Your rewards were claimed.',
};

const FailedSnackbarMessages: TxMessages = {
  [TX_KEY.CREATE_DAO]: 'Failed to create the DAO.',
  [TX_KEY.STAKE_TOKEN]: 'Failed to stake your tokens.',
  [TX_KEY.UNSTAKE_TOKEN]: 'Failed to unstake your tokens.',
  [TX_KEY.STAKE_NFT]: 'Failed to stake your NFTs.',
  [TX_KEY.UNSTAKE_NFT]: 'Failed to unstake your NFTs.',
  [TX_KEY.CLAIM]: 'Failed to claim your tokens.',
  [TX_KEY.CREATE_PROPOSAL]: 'Failed to create your proposal.',
  [TX_KEY.EXECUTE_PROPOSAL]: 'Failed to execute the proposal.',
  [TX_KEY.CAST_VOTE]: 'Failed to vote on the proposal.',
  [TX_KEY.DEPOSIT]: 'Failed to deposit your tokens.',
  [TX_KEY.DEPOSIT_INTO_FUNDS_DISTRIBUTOR]: 'Failed to deposit your tokens.',
  [TX_KEY.CLAIM_REWARDS]: 'Failed to claim your rewards.',
};

export const useTransactionSnackbars = () => {
  const networkName = useNetworkName();

  const refetch = useRefetchQueries();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onPending = useRefCallback(
    (transaction: PendingTransaction) => {
      enqueueSnackbar(
        <TransactionSnackbar transaction={transaction} variant="pending" message="Transaction pending" />,
        {
          key: transaction.txHash,
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        }
      );
    },
    [enqueueSnackbar]
  );

  const onCancelled = useRefCallback(
    (transaction: PendingTransaction) => {
      closeSnackbar(transaction.txHash);
    },
    [closeSnackbar]
  );

  const onCompleted = useRefCallback(
    (transaction: CompletedTransaction) => {
      const txKey = transaction.payload['txKey'] as TX_KEY;
      indexerCompletion({
        networkName,
        height: transaction.height,
        txKey,
        callback: () => {
          refetch(txKey);

          closeSnackbar(transaction.txHash);

          enqueueSnackbar(
            <TransactionSnackbar
              transaction={transaction}
              variant="completed"
              message={CompletedSnackbarMessages[txKey]}
            />,
            {
              anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
              autoHideDuration: 5000,
            }
          );
        },
      });
    },
    [refetch, enqueueSnackbar, closeSnackbar]
  );

  const onFailed = useRefCallback(
    (transaction: FailedTransaction) => {
      const txKey = transaction.payload['txKey'] as TX_KEY;

      refetch(txKey);

      closeSnackbar(transaction.txHash);

      enqueueSnackbar(
        <TransactionSnackbar transaction={transaction} variant="failed" message={FailedSnackbarMessages[txKey]} />,
        {
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          autoHideDuration: 5000,
        }
      );
    },
    [refetch, enqueueSnackbar, closeSnackbar]
  );

  useTransactionSubscribers({
    onPending,
    onCancelled,
    onCompleted,
    onFailed,
  });
};

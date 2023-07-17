import { Transaction, TransactionStatus } from 'chain/transactions';
import { useSnackbar } from 'notistack';
import { useSnackbarKey } from './SnackbarContainer';
import { useMemo } from 'react';
import { useTransactionError } from 'chain/components/TransactionErrorProvider';
import { useNetworkName } from 'chain/hooks/useNetworkName';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { ExternalLink } from 'components/link';
import { Text } from 'lib/ui/Text';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { HStack, VStack } from 'lib/ui/Stack';
import { PopoverContainer } from 'lib/ui/Menu/PopoverPanel';
import { CheckIcon } from 'lib/ui/icons/CheckIcon';
import { AlertCircleIcon } from 'lib/ui/icons/AlertCircleIcon';
import { Spinner } from 'lib/ui/Spinner';
import { Match } from 'lib/ui/Match';
import { getFinderUrl } from 'chain/utils/getFinderUrl';
import { CloseButton } from 'lib/ui/buttons/CloseButton';

type Variant = 'pending' | 'completed' | 'failed';

interface TransactionSnackbarProps {
  transaction: Transaction;
  variant: Variant;
  message: string;
  timeout?: number;
}

export const TransactionSnackbar = (props: TransactionSnackbarProps) => {
  const { transaction, variant, message } = props;

  const { closeSnackbar } = useSnackbar();

  const snackbarKey = useSnackbarKey();

  const myAddress = useMyAddress();

  const { showDetails: showTransactionErrorDetails } = useTransactionError();

  const networkName = useNetworkName();

  const detailsUrl = useMemo(() => {
    if (!myAddress) {
      return;
    }

    if (transaction.txHash.length === 0 && transaction.status === TransactionStatus.Failed) {
      showTransactionErrorDetails(transaction.error.message.slice(0, 500));
      return;
    }

    return getFinderUrl(networkName, transaction.txHash);
  }, [myAddress, networkName, showTransactionErrorDetails, transaction]);

  return (
    <PopoverContainer>
      <HStack gap={20} style={{ minWidth: 300 }} alignItems="center">
        <Text as="div" size={20}>
          <Match
            value={variant}
            completed={() => <CheckIcon />}
            failed={() => <AlertCircleIcon />}
            pending={() => <Spinner />}
          />
        </Text>
        <VStack gap={4}>
          <Text weight="semibold" color="regular">
            {message}
          </Text>
          {detailsUrl ? (
            <ExternalLink to={detailsUrl}>
              <ShyTextButton as="div" text="View details" />
            </ExternalLink>
          ) : transaction.status === TransactionStatus.Failed && transaction.error ? (
            <Text cropped>{transaction.error.message}</Text>
          ) : null}
        </VStack>
        {variant !== 'pending' && <CloseButton onClick={() => closeSnackbar(snackbarKey)} />}
      </HStack>
    </PopoverContainer>
  );
};

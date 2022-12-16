import { ComponentWithChildrenProps } from 'lib/shared/props';
import { createContextHook } from 'lib/shared/utils/createContextHook';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { Modal } from 'lib/ui/Modal';
import { Text } from 'lib/ui/Text';
import { createContext, useState } from 'react';

interface TransactionErrorState {
  showDetails: (details: string) => void;
}

export const TransactionErrorContext = createContext<TransactionErrorState | undefined>(undefined);

export const TransactionErrorProvider = ({ children }: ComponentWithChildrenProps) => {
  const [details, setDetails] = useState<string | null>(null);

  return (
    <TransactionErrorContext.Provider value={{ showDetails: setDetails }}>
      {children}
      {details && (
        <Modal
          onClose={() => setDetails(null)}
          footer={
            <PrimaryButton onClick={() => setDetails(null)} kind="secondary">
              Close
            </PrimaryButton>
          }
          title="Error details"
          renderContent={() => <Text color="supporting">{details}</Text>}
        />
      )}
    </TransactionErrorContext.Provider>
  );
};

export const useTransactionError = createContextHook(TransactionErrorContext, 'TransactionErrorContext');

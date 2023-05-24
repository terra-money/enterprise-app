import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { SelectAssetStep } from 'pages/dao/deposit/SelectAssetStep';
import { useState } from 'react';
import { Token } from 'types/Token';
import { DepositAssetStep } from './DepositAssetStep';

export const DepositIntoFundsDistributorOverlay = ({ onClose }: ClosableComponentProps) => {
  const [token, setToken] = useState<Token | null>(null);

  return (
    <Modal
      title="Deposit an asset"
      onClose={onClose}
      renderContent={() => {
        return (
          <VStack gap={32}>
            {token ? (
              <DepositAssetStep token={token} onBack={() => setToken(null)} onSuccess={onClose} />
            ) : (
              <SelectAssetStep onSelect={setToken} onCancel={onClose} />
            )}
          </VStack>
        );
      }}
    />
  );
};

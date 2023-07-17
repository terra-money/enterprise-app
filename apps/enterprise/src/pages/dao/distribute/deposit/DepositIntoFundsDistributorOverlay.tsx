import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { SelectAssetStep } from 'pages/dao/deposit/SelectAssetStep';
import { useState } from 'react';
import { DepositAssetStep } from './DepositAssetStep';
import { Asset, AssetInfo } from 'chain/Asset';

export const DepositIntoFundsDistributorOverlay = ({ onClose }: ClosableComponentProps) => {
  const [asset, setAsset] = useState<(Asset & AssetInfo) | null>(null);

  return (
    <Modal
      title="Deposit an asset"
      onClose={onClose}
      renderContent={() => {
        return (
          <VStack gap={32}>
            {asset ? (
              <DepositAssetStep asset={asset} onBack={() => setAsset(null)} onSuccess={onClose} />
            ) : (
              <SelectAssetStep onSelect={setAsset} onCancel={onClose} />
            )}
          </VStack>
        );
      }}
    />
  );
};

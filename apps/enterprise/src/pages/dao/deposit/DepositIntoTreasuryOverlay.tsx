import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { useState } from 'react';
import { DepositAssetStep } from './DepositAssetStep';
import { SelectAssetStep } from './SelectAssetStep';
import { Asset, AssetInfo } from 'chain/Asset';

export const DepositIntoTreasuryOverlay = ({ onClose }: ClosableComponentProps) => {
  const [asset, setAsset] = useState<(Asset & AssetInfo) | null>(null);

  return (
    <Modal
      title="Deposit an asset"
      placement="top"
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

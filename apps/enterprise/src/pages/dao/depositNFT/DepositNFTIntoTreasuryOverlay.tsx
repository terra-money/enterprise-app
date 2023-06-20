import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { DepositNFT } from './DepositNFT';

export const DepositNFTIntoTreasuryOverlay = ({ onClose }: ClosableComponentProps) => {
  return (
    <Modal
      title="Deposit NFTs"
      onClose={onClose}
      renderContent={() => {
        return (
          <VStack gap={32}>
            <DepositNFT />
          </VStack>
        );
      }}
    />
  );
};

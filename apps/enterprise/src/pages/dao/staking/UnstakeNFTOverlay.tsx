import { NumericPanel } from 'components/numeric-panel';
import { useUnstakeNFTForm } from './useUnstakeNFTForm';
import { useUnstakeNFTTx } from 'tx';
import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';

interface UnstakeNFTOverlayProps extends ClosableComponentProps {
  walletAddress: string;
  daoAddress: string;
  staked: string[];
  symbol: string;
}

export const UnstakeNFTOverlay = ({ daoAddress, staked, symbol, onClose }: UnstakeNFTOverlayProps) => {
  const [, { submitDisabled }] = useUnstakeNFTForm({ staked });

  const [txResult, unstakeNFTTx] = useUnstakeNFTTx();

  return (
    <Modal
      title="Unstake your NFTs"
      onClose={onClose}
      renderContent={() => <NumericPanel title="Currently staking" value={staked.length} suffix={symbol} />}
      footer={
        <VStack gap={12}>
          <PrimaryButton
            isDisabled={submitDisabled}
            isLoading={txResult.loading}
            onClick={async () => {
              if (submitDisabled === false) {
                await unstakeNFTTx({
                  daoAddress,
                  tokens: staked,
                });
                onClose();
              }
            }}
          >
            Stake
          </PrimaryButton>
          <PrimaryButton kind="secondary" onClick={onClose}>
            Cancel
          </PrimaryButton>
        </VStack>
      }
    />
  );
};

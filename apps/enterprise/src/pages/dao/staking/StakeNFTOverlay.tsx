import { NumericPanel } from 'components/numeric-panel';
import { useStakeNFTForm } from './useStakeNFTForm';
import { useStakeNFTTx } from 'tx';
import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { NftInfo } from 'chain/queries/useNftInfoQuery';

interface StakeNFTOverlayProps extends ClosableComponentProps {
  walletAddress: string;
  daoAddress: string;
  tokenAddress: string;
  nfts: NftInfo[];
  staked: string[];
  symbol: string;
}

export const StakeNFTOverlay = ({ daoAddress, tokenAddress, nfts, staked, symbol, onClose }: StakeNFTOverlayProps) => {
  const [, { submitDisabled }] = useStakeNFTForm({ nfts });

  const [txResult, stakeNFTTx] = useStakeNFTTx();

  return (
    <Modal
      title="Stake your NFTs"
      onClose={onClose}
      renderContent={() => (
        <VStack gap={16}>
          <NumericPanel title="Currently staking" value={staked.length} suffix={symbol} />
          <NumericPanel title="NFTs in wallet" value={nfts.length} suffix={symbol} />
        </VStack>
      )}
      footer={
        <VStack gap={12}>
          <PrimaryButton
            isDisabled={submitDisabled}
            isLoading={txResult.loading}
            onClick={async () => {
              if (submitDisabled === false) {
                await stakeNFTTx({
                  daoAddress,
                  tokenAddress,
                  nfts,
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

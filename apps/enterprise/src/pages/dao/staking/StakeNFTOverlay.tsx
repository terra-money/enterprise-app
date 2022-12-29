import { NumericPanel } from 'components/numeric-panel';
import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useStakeNftTx } from 'dao/tx/useStakeNftTx';
import { useState } from 'react';
import { assertDefined } from '@terra-money/apps/utils';
import { MyNftIdInput } from 'chain/components/MyNftIdInput';

interface StakeNFTOverlayProps extends ClosableComponentProps {
  staked: string[];
  symbol: string;
}

export const StakeNFTOverlay = ({ staked, onClose }: StakeNFTOverlayProps) => {
  const { address, membershipContractAddress } = useCurrentDao();

  const [txResult, stakeNft] = useStakeNftTx();

  const [tokenId, setTokenId] = useState<string | null>(null);

  return (
    <Modal
      title="Stake your NFTs"
      onClose={onClose}
      renderContent={() => (
        <VStack gap={16}>
          <NumericPanel title="No of NFTs staked" value={staked.length} />
          <MyNftIdInput nftAddress={membershipContractAddress} value={tokenId} onChange={setTokenId} />
        </VStack>
      )}
      footer={
        <VStack gap={12}>
          <PrimaryButton
            isDisabled={!tokenId}
            isLoading={txResult.loading}
            onClick={async () => {
              await stakeNft({
                daoAddress: address,
                collectionAddress: membershipContractAddress,
                tokenId: assertDefined(tokenId),
              });
              onClose();
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

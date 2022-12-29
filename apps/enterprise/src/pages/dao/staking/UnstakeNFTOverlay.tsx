import { NumericPanel } from 'components/numeric-panel';
import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { useUnstakeNftTx } from 'dao/tx/useUnstakeNftTx';
import { useState } from 'react';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { assertDefined } from '@terra-money/apps/utils';
import { NftIdInput } from 'chain/components/NftIdInput';

interface UnstakeNFTOverlayProps extends ClosableComponentProps {
  staked: string[];
  symbol: string;
}

export const UnstakeNFTOverlay = ({ staked, symbol, onClose }: UnstakeNFTOverlayProps) => {
  const { address, membershipContractAddress } = useCurrentDao();

  const [txResult, unstakeNft] = useUnstakeNftTx();

  const [tokenId, setTokenId] = useState<string | null>(null);

  return (
    <Modal
      title="Unstake your NFT"
      onClose={onClose}
      renderContent={() => (
        <VStack gap={16}>
          <NumericPanel title="Currently staked" value={staked.length} suffix={symbol} />
          <NftIdInput
            collectionAddress={membershipContractAddress}
            ids={staked}
            value={tokenId}
            onChange={setTokenId}
          />
        </VStack>
      )}
      footer={
        <VStack gap={12}>
          <PrimaryButton
            isDisabled={!tokenId}
            isLoading={txResult.loading}
            onClick={async () => {
              await unstakeNft({
                daoAddress: address,
                tokenId: assertDefined(tokenId),
              });
              onClose();
            }}
          >
            Unstake
          </PrimaryButton>
          <PrimaryButton kind="secondary" onClick={onClose}>
            Cancel
          </PrimaryButton>
        </VStack>
      }
    />
  );
};

import { NumericPanel } from 'components/numeric-panel';
import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useStakeNftsTx } from 'dao/tx/useStakeNftsTx';
import { useMyNftsQuery } from 'chain/queries/useMyNftsQuery';
import { NftIdsInput } from 'chain/components/NftIdInput';
import { useSubSetValue } from 'lib/shared/hooks/useSubSetValue';

interface StakeNFTOverlayProps extends ClosableComponentProps {
  staked: string[];
  symbol: string;
}

export const StakeNFTOverlay = ({ staked, onClose }: StakeNFTOverlayProps) => {
  const { address, dao_membership_contract } = useCurrentDao();

  const [txResult, stakeNfts] = useStakeNftsTx();

  const { data: nfts = [], isLoading } = useMyNftsQuery(dao_membership_contract);
  const [tokenIds, setTokenIds] = useSubSetValue(nfts.map((nft) => nft.tokenId));

  return (
    <Modal
      title="Stake your NFTs"
      onClose={onClose}
      renderContent={() => (
        <VStack gap={16}>
          <NumericPanel title="No of NFTs staked" value={staked.length} />
          <NftIdsInput options={nfts} isLoading={isLoading} value={tokenIds} onChange={setTokenIds} />
        </VStack>
      )}
      footer={
        <VStack gap={12}>
          <PrimaryButton
            isDisabled={tokenIds.length < 1}
            isLoading={txResult.loading}
            onClick={async () => {
              await stakeNfts({
                daoAddress: address,
                collectionAddress: dao_membership_contract,
                tokenIds,
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

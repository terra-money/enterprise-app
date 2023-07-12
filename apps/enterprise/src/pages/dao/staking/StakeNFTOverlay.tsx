import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { Button } from 'lib/ui/buttons/Button';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useStakeNftsTx } from 'dao/tx/useStakeNftsTx';
import { useMyNftsQuery } from 'chain/queries/useMyNftsQuery';
import { NftIdsInput } from 'chain/components/NftIdInput';
import { useSubSetValue } from 'lib/shared/hooks/useSubSetValue';
import { NumericStatistic } from 'lib/ui/NumericStatistic';

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
          <NumericStatistic value={staked.length} suffix="No of NFTs staked" />
          <NftIdsInput options={nfts} isLoading={isLoading} value={tokenIds} onChange={setTokenIds} />
        </VStack>
      )}
      footer={
        <VStack gap={12}>
          <Button
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
          </Button>
          <Button kind="secondary" onClick={onClose}>
            Cancel
          </Button>
        </VStack>
      }
    />
  );
};

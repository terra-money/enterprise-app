import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { Button } from 'lib/ui/buttons/Button';
import { useUnstakeNftsTx } from 'dao/tx/useUnstakeNftsTx';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { NftIdsInput } from 'chain/components/NftIdInput';
import { useNftsQuery } from 'chain/queries/useNftsQuery';
import { useSubSetValue } from 'lib/shared/hooks/useSubSetValue';
import { Panel } from 'lib/ui/Panel/Panel';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { NumericStatistic } from 'lib/ui/NumericStatistic';

interface UnstakeNFTOverlayProps extends ClosableComponentProps {
  staked: string[];
  symbol: string;
}

export const UnstakeNFTOverlay = ({ staked, symbol, onClose }: UnstakeNFTOverlayProps) => {
  const { address, dao_membership_contract } = useCurrentDao();

  const [txResult, unstakeNft] = useUnstakeNftsTx();

  const { data: nfts = [], isLoading } = useNftsQuery({ collectionAddress: dao_membership_contract, ids: staked });
  const [tokenIds, setTokenIds] = useSubSetValue(nfts.map((nft) => nft.tokenId));

  return (
    <Modal
      title="Unstake your NFT"
      onClose={onClose}
      renderContent={() => (
        <VStack gap={16}>
          <Panel>
            <TitledSection title="Currently staked">
              <NumericStatistic value={staked.length} suffix={symbol} />
            </TitledSection>
          </Panel>
          <NftIdsInput options={nfts} isLoading={isLoading} value={tokenIds} onChange={setTokenIds} />
        </VStack>
      )}
      footer={
        <VStack gap={12}>
          <Button
            isDisabled={tokenIds.length < 1}
            isLoading={txResult.loading}
            onClick={async () => {
              await unstakeNft({
                daoAddress: address,
                tokenIds,
              });
              onClose();
            }}
          >
            Unstake
          </Button>
          <Button kind="secondary" onClick={onClose}>
            Cancel
          </Button>
        </VStack>
      }
    />
  );
};

import { TreasuryPanel } from '../TreasuryPanel';
import { DepositNFTIntoTreasury } from 'pages/dao/depositNFT';
import { PictureIcon } from 'lib/ui/icons/PictureIcon';
import { useCurrentDaoNfts } from 'queries/useCurrentDaoNfts';
import { sum } from 'lib/shared/utils/sum';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { NftItem } from './NftItem';

export const CurrentDaoTreasuryNfts = () => {
  const { data: nfts, isError } = useCurrentDaoNfts();

  return (
    <TreasuryPanel
      title="NFT Gallery"
      icon={<PictureIcon />}
      itemName="NFT"
      depositAction={<DepositNFTIntoTreasury />}
      getTotalUsdValue={(nfts) => sum(nfts.map(nft => nft.usd || 0))}
      items={nfts}
      isError={isError}
      renderItems={(nfts) => (
        <SameWidthChildrenRow gap={16} maxColumns={4} minChildrenWidth={240}>
          {nfts.map(nft => <NftItem key={nft.id} {...nft} />)}
        </SameWidthChildrenRow>
      )}
    />
  );
};

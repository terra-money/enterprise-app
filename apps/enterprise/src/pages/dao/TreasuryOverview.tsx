import { Container } from '@terra-money/apps/components';
import { Panel } from 'components/panel';
import { NFTPairs, useNFTsOwnersQuery, useStakedNfts } from 'queries';
import { TreasuryTokensOverview } from './TreasuryTokensOverview';
import styles from './TreasuryOverview.module.sass';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { NFTCard } from './NFTCard';
import { Text } from 'components/primitives';
import { useDAONFTsWhitelist } from 'queries/useDAONFTsWhitelist';
import { CW20Addr } from '@terra-money/apps/types';
import { useCurrentDaoAddress } from 'dao/navigation';
import { ViewMoreNft } from './viewMoreNft';
import { DepositIntoTreasury } from './deposit';

export const TreasuryOverview = () => {
  const address = useCurrentDaoAddress();
  const dao = useCurrentDao();

  const { data: whitelist = [] } = useDAONFTsWhitelist(address);
  const { data: stakedNfts = [] } =  useStakedNfts(address);
  
  let nftCollection: NFTPairs[] | undefined = [];
  const { data } = useNFTsOwnersQuery(whitelist as CW20Addr[], dao.address);
  if (dao.dao_type !== 'nft') {
    nftCollection = data;
  } else {
    nftCollection = [];
  }

  let nftTokensToDisplay = [];

  if (nftCollection) {
    for (let i = 0; i < nftCollection.length; i++) {
      const nft = nftCollection[i];
      if (nft.tokenIds.tokens?.length) {
        for (let j = 0; j < nft.tokenIds.tokens.length; j++) {
          const token = nft.tokenIds.tokens[j];
          nftTokensToDisplay.push({ token: [token], collectionAddress: nft.collectionAddress });
          if (nftTokensToDisplay.length === 4) {
            break;
          }
        }
      }
      if (nftTokensToDisplay.length === 4) {
        break;
      }
    }
  }
  return (
    <>
      <Panel className={styles.root}>
        <Container direction="column" gap={32}>
          <TreasuryTokensOverview />
        </Container>
      </Panel>
      <Container className={styles.nftAssets} direction="column" gap={24}>
        <Text className={styles.label} variant="heading4">
          NFT Treasury
        </Text>
        <Container direction="row" gap={8} className={styles.nftContainer}>
          <>
            {nftTokensToDisplay.length !== 0 ? (
              nftTokensToDisplay.map((nft, index) => (
                <NFTCard
                  key={index}
                  nftCollectionAdress={nft.collectionAddress}
                  tokenIds={nft.token}
                />
              ))
            ) : (
              <Container className={styles.noNFTToDisplay}>
                <Text className={styles.noNFTLabel} variant="label">
                  No NFTs were added to the treasury yet.
                </Text>
              </Container>
            )}
          </>
        </Container>
        {nftCollection?.length && <Container gap={16} className={styles.nftsActionContainer}>
           <ViewMoreNft/>
           <DepositIntoTreasury />
        </Container>}
      </Container>
    </>
  );
};

import { Container, ScrollableContainer } from '@terra-money/apps/components';
import { Panel } from 'components/panel';
import { useDAONFTTreasury } from 'queries';
import { TreasuryTokensOverview } from './TreasuryTokensOverview';
import styles from './TreasuryOverview.module.sass';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { NFTCard } from './NFTCard';
import { Text } from 'components/primitives';

export const TreasuryOverview = () => {
  const dao = useCurrentDao();
  const { data: nfts = [] } = useDAONFTTreasury(dao.address);
  
  return (
    <>
      <Panel className={styles.root}>
        <Container direction="column" gap={32}>
          <TreasuryTokensOverview />
        </Container>
      </Panel>
      <Container className={styles.nftAssets} direction="column" gap={8}>
        <Text className={styles.label} variant="heading4">
          NFT Treasury
        </Text>
        <ScrollableContainer className={styles.scrollableContainer}>
          <Container direction="row" gap={8} className={styles.nftContainer}>
            <>
              {nfts.length && nfts[0]?.token_ids.length !== 0 ? (
                nfts.filter(nft => nft.token_ids.length !== 0).map((nft, index) => {
                  return <NFTCard key={index} nftCollectionAdress={nft.nft_address} tokenIds={nft.token_ids} />;
                })
              ) : (
                <Container className={styles.noNFTToDisplay}>
                  <Text className={styles.noNFTLabel} variant="label">
                    No NFTs were added to the treasury yet.
                  </Text>
                </Container>
              )}
            </>
          </Container>
        </ScrollableContainer>
      </Container>
    </>
  );
};

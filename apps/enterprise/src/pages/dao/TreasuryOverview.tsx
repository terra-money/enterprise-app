import { Container } from '@terra-money/apps/components';
import { Panel } from 'components/panel';
import { useDAONFTTreasury } from 'queries';
import { TreasuryTokensOverview } from './TreasuryTokensOverview';
import styles from './TreasuryOverview.module.sass';
import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';
import { LabeledPageSection } from 'lib/ui/LabeledPageSection';
import { NFTCard } from './NFTCard';
const LIMIT = 10;
export const TreasuryOverview = () => {
  const dao = useCurrentDao();
  const { data: nfts = [] } = useDAONFTTreasury(dao.address);
  const flattened = nfts.flatMap(nft => [nft.nft_address, nft.token_ids])




  const nftTokenIdCount = nfts.reduce((previous, current) => {
    return previous + current.token_ids.length;
  }, 0);



  return (
    <>
      <Panel className={styles.root}>
        <Container direction="column" gap={32}>
          <TreasuryTokensOverview />
          <hr className={styles.sep} />
        </Container>

        <Container className={styles.nftAssets} direction="row" gap={8}>
          <LabeledPageSection name="NFT Treasury">
            <Container direction="row" gap={8} className={styles.nftContainer}>
              <>
                {[...Array(LIMIT)].map((_, index) => {
                  return <NFTCard key={index} skeleton={true} nftCollectionAdress={flattened[0] as string} tokenIds={flattened[1] as string[]}
                  />;
                })}
              </>
            </Container>
          </LabeledPageSection>
        </Container>
      </Panel>
    </>


  );
};
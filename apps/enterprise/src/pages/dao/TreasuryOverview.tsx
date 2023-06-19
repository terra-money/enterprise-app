import { Container } from '@terra-money/apps/components';
import { NFTPairs, useNFTsOwnersQuery } from 'queries';
import styles from './TreasuryOverview.module.sass';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { NFTCard } from './NFTCard';
import { Text } from 'components/primitives';
import { CW20Addr } from '@terra-money/apps/types';
import { ViewMoreNft } from './viewMoreNft';
import { useState, useEffect, useMemo } from 'react';
import { DepositNFTIntoTreasury } from './depositNFT';
import { useCurrentDaoNftWhitelistQuery } from 'queries/useCurrentDaoNftWhitelistQuery';
import { CurrentDaoTreasuryAssets } from 'dao/components/TreasuryAssets/CurrentDaoTreasuryAssets';

export const TreasuryOverview = () => {
  const dao = useCurrentDao();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { data: whitelist = [] } = useCurrentDaoNftWhitelistQuery();

  let nftCollection: NFTPairs[] | undefined = [];
  const { data } = useNFTsOwnersQuery(whitelist as CW20Addr[], dao.address);
  if (dao.dao_type !== 'nft') {
    nftCollection = data;
  } else {
    nftCollection = [];
  }

  const minimumNFTsAmmount = 3;

  const nftDisplayLimit = useMemo(() => {

    const breakpoints = [1150, 1290, 1404, 1550, 1750, 2000]
    const displayLimits = [3, 4, 4, 5, 5, 6]

    for (let i = breakpoints.length - 1; i >= 0; i--) {
      if (windowWidth >= breakpoints[i]) {
        return displayLimits[i];
      }
    }
    return minimumNFTsAmmount;
  }, [windowWidth]);

  let nftTokensToDisplay = [];

  if (nftCollection) {
    for (let i = 0; i < nftCollection.length && nftTokensToDisplay.length < nftDisplayLimit; i++) {
      const nft = nftCollection[i];
      if (nft.tokenIds.tokens?.length) {
        for (let j = 0; j < nft.tokenIds.tokens.length && nftTokensToDisplay.length < nftDisplayLimit; j++) {
          const token = nft.tokenIds.tokens[j];
          nftTokensToDisplay.push({ token: [token], collectionAddress: nft.collectionAddress });
        }
      }
    }
  }

  return (
    <>
      <CurrentDaoTreasuryAssets />
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
          <ViewMoreNft />
          <DepositNFTIntoTreasury />
        </Container>}
      </Container>
    </>
  );
};
import { Container } from '@terra-money/apps/components';
import { CW20Addr } from '@terra-money/apps/types';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { NFTPairs, useNFTsOwnersQuery } from 'queries';
import { Text } from 'components/primitives';
import styles from './ViewMoreNftOverlay.module.sass'
import { NFTCard } from '../NFTCard';
import { VStack } from 'lib/ui/Stack';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { LoadingPage } from 'pages/shared/LoadingPage';
import { useCurrentDaoNftWhitelistQuery } from 'queries/useCurrentDaoNftWhitelistQuery';

export const ViewMoreNftOverlay = ({ onClose }: ClosableComponentProps) => {
    const dao = useCurrentDao()
    const { data: whitelist = [] } = useCurrentDaoNftWhitelistQuery()

    const { data, isLoading } = useNFTsOwnersQuery(whitelist as CW20Addr[], dao.address);
    const nftCollection: NFTPairs[] | undefined = data;

    const nftCount = () => {
        let count = 0;
        nftCollection?.forEach((nftPair) => {
            count += nftPair.tokenIds?.tokens?.length || 0;
        });
        return count;
    }


    return (
        <Modal
            width={970}
            className={styles.viewMoreNftModal}
            title="NFT Treasury"
            onClose={onClose}
            renderContent={() => {
                return (
                    <LoadingPage isLoading={isLoading}>
                        <VStack className={styles.modalContent} gap={32}>
                            <Container className={styles.subheader} gap={32}>
                                <Text variant='label'> Displaying {nftCount()} NFTs in treasury</Text>
                            </Container>
                            <Container className={styles.scrollableContainer}>
                                {nftCollection?.length && nftCollection[0]?.tokenIds.length !== 0 ? (
                                    nftCollection.filter(nftColitem => nftColitem.tokenIds.length !== 0).map((nft, index) => {
                                        return <NFTCard key={index} nftCollectionAdress={nft.collectionAddress} tokenIds={nft.tokenIds.tokens ? nft.tokenIds.tokens : nft.tokenIds.ids} />;
                                    })
                                ) : (
                                    <Container className={styles.noNFTToDisplay}>
                                        <Text className={styles.noNFTLabel} variant="label">
                                            No NFTs were added to the treasury yet.
                                        </Text>
                                    </Container>
                                )}

                            </Container>
                            <PrimaryButton kind="secondary" onClick={onClose}>
                                Close
                            </PrimaryButton>
                        </VStack>
                    </LoadingPage>


                );
            }}
        />
    );
};
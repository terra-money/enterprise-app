import { Container } from '@terra-money/apps/components';
import { CW20Addr } from '@terra-money/apps/types';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useCurrentDaoAddress } from 'dao/navigation';
import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { NFTPairs, useNFTsOwnersQuery } from 'queries';
import { useDAONFTsWhitelist } from 'queries/useDAONFTsWhitelist';
import { Text } from 'components/primitives';
import styles from './ViewMoreNftOverlay.module.sass'
import { NFTCard } from '../NFTCard';
import { VStack } from 'lib/ui/Stack';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';


export const ViewMoreNftOverlay = ({ onClose }: ClosableComponentProps) => {
    const address = useCurrentDaoAddress();
    const dao = useCurrentDao()
    const { data: whitelist = [] } = useDAONFTsWhitelist(address)


    const { data } = useNFTsOwnersQuery(whitelist as CW20Addr[], dao.address);
    const nftCollection: NFTPairs[] | undefined = data;
    return (
        <Modal
            width={970}
            className={styles.viewMoreNftModal}
            title="NFT Treasury"
            onClose={onClose}
            renderContent={() => {
                return (
                    <VStack className={styles.modalContent} gap={32}>
                        <Container className={styles.subheader} gap={32}>
                        <Text variant='label'> Displaying {nftCollection?.length} NFTs in treasury</Text>
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

                );
            }}
        />
    );
};
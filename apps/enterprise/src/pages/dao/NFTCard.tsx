import { Container } from '@terra-money/apps/components';
import { formatAmount, demicrofy } from '@terra-money/apps/libs/formatting';
import { Text } from 'components/primitives';
import { useNFTInfoQuery } from 'queries';
import styles from './NFTCard.module.sass';

interface NFTCardProps {
    className?: string;
    nftCollectionAdress: string;
    tokenIds: string[];
}

export const NFTCard = (props: NFTCardProps) => {
    const { nftCollectionAdress, tokenIds } = props;
    const nftData = useNFTInfoQuery(nftCollectionAdress, tokenIds);
    const nftObject = nftData.data as any;
    return (
        <>
            {nftData.data && (
                tokenIds.map((index) => {
                    if (nftObject[index].data) {
                        const nftCollectionInfo = nftObject[index]["data"]["tokensPage"]["collection"]["collectionInfo"]
                        const nft = nftObject[index]['data']['tokensPage']['token'];
                        return (
                            <Container className={styles.card}>
                                <img src={nft.imageUrlFileserver} width={156} className={styles.nftPreview} alt="NFT Preview" />
                                <Container direction="column" className={styles.nftInfo} gap={16}>
                                    <Text className={styles.name} variant="label">
                                        {nft.name}
                                    </Text>
                                    {nft.price ? (
                                        <Text className={styles.price} variant="label">
                                            {nft.denom}
                                            {formatAmount(demicrofy(nft.price, 6))}{' '}
                                        </Text>
                                    ) : (
                                        <Text className={styles.price} variant="label">
                                            {nftCollectionInfo.floor_price && formatAmount(demicrofy(nftCollectionInfo.floor_price, 6))}{' '}
                                        </Text>
                                    )}
                                </Container>
                            </Container>
                        );
                    } else {
                        return (
                            <Container className={styles.card}>
                                <img src={nftObject[index].image_data} width={156} className={styles.nftPreview} alt="NFT Preview" />
                                <Container direction="column" className={styles.nftInfo} gap={16}>
                                    <Text className={styles.name} variant="label">
                                        {nftObject[index].name}
                                    </Text>
                                    <Text className={styles.price} variant="label">
                                    </Text>
                                </Container>
                            </Container>
                        )
                    }
                })
            )}


        </>
    );
};

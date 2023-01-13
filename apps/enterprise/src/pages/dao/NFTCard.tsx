import { Container } from '@terra-money/apps/components';
import { formatAmount, demicrofy } from '@terra-money/apps/libs/formatting';
import classNames from 'classnames';
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
    const nftData = useNFTInfoQuery(nftCollectionAdress, tokenIds)

    return (
        <>
            {nftData.data && nftData.status === "success" &&
                tokenIds.map((index) => {
                    const nftObject = nftData.data as any;
                    // TODO : add floor price of the collection or a placeholder of some sort 
                    // const nftCollectionInfo = nftObject[parseInt(index)]["data"]["tokensPage"]["collection"]["collectionInfo"] 
                    const nft = nftObject[parseInt(index)]["data"]["tokensPage"]["token"];
                    return (
                        <Container className={classNames(styles.card, styles.root)}>
                            <img src={nft.imageUrlFileserver} width={156} className={styles.nftPreview} alt="NFT Preview" />
                            <Container direction='column' className={styles.nftInfo} gap={16}>
                                <Text className={styles.name} variant="label">
                                    {nft.name} #{nft.tokenId}
                                </Text>
                                <Text className={styles.price} variant="label">
                                    {nft.denom}
                                    {formatAmount(demicrofy(nft.price, 2))}{' '}
                                </Text>
                            </Container>
                        </Container>
                    )
                })
            }

        </>

    );
};

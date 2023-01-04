import { Container } from '@terra-money/apps/components';
import { formatAmount, demicrofy } from '@terra-money/apps/libs/formatting';
import { toPercents, assertDefined } from '@terra-money/apps/utils';
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
    const nftObject = nftData.data as any;




    return (
        <>
            {tokenIds.map((index) => {
                const nft = nftObject[parseInt(index)]["data"]["tokensPage"]["token"];
                return (
                    <Container className={classNames(styles.card, styles.root)}>
                        <img src={nft.imageUrlFileserver} width={156} className={styles.nftPreview} alt="NFT Preview" />
                        <Container direction='column' className={styles.nftInfo} gap={16}>
                            <Text className={styles.name} variant="label">
                                {nft.name}
                            </Text>
                            <Text className={styles.price} variant="label">
                                {nft.denom} {formatAmount(demicrofy(nft.price, 2))}{' '}
                            </Text>
                        </Container>
                    </Container>
                )
            })}

        </>

    );
};

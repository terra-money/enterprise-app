import { Container } from '@terra-money/apps/components';
import classNames from 'classnames';
import { Text } from 'components/primitives';
import { Skeleton } from 'components/skeleton';
import { useNFTInfoQuery } from 'queries';
import styles from './NFTCard.module.sass';


interface NFTCardProps {
    className?: string;
    skeleton: boolean;
    nftCollectionAdress: string;
    tokenIds: string[];
}

export const NFTCard = (props: NFTCardProps) => {
    const { skeleton, nftCollectionAdress, tokenIds } = props;
    const nftInfo = useNFTInfoQuery(nftCollectionAdress)
    console.log(nftInfo);

    // if (nftCollectionAdress === undefined || skeleton) {
    //     return (
    //         <Container className={classNames(className, styles.root, styles.skeleton)}>
    //             <Skeleton className={styles.logo} />
    //             <Skeleton className={styles.name} />
    //             <Skeleton className={styles.favourite} />
    //         </Container>
    //     );
    // }

    // const logo = <DAOLogo logo={dao.logo} className={styles.logo} />;



    return (
        <Container className={classNames(styles.card, styles.root)}>
            <img src="/images/NFT-Placeholder.png" width={156} className={styles.nftPreview} alt="NFT Preview" />
            <Container direction='column' className={styles.nftInfo} gap={16}>
                <Text className={styles.name} variant="label">
                    name
                </Text>
                <Text className={styles.price} variant="label">
                    nft price
                </Text>
            </Container>

        </Container>
    );
};

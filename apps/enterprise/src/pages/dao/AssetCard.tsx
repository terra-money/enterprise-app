import { Container } from '@terra-money/apps/components';
import { TokenIcon } from 'components/token-icon';
import { Text } from 'components/primitives';
import { demicrofy, formatAmount } from '@terra-money/apps/libs/formatting';
import styles from './AssetCard.module.sass'
import { HStack } from 'lib/ui/Stack';
import { toPercents } from '@terra-money/apps/utils';
import Big from 'big.js';
import { AssetInfoWithPrice } from 'chain/Asset';

interface AssetCardProps {
    className?: string;
    token: AssetInfoWithPrice;
    treasuryTotalInUSD?: Big | undefined;
}

export const AssetCard = ({ token, treasuryTotalInUSD }: AssetCardProps) => {
    return (
        <>
            <Container className={styles.assetCardContainer}>
                <Container className={styles.iconContainer}>
                    <TokenIcon className={styles.icon} symbol={token.symbol} path={token.icon} />
                </Container>
                <Container className={styles.assetContainer}>
                    <Text variant='heading4'>
                        {token.symbol}
                    </Text>
                    <HStack justifyContent="space-between" gap={8}>
                        <Text variant='label'>
                            {formatAmount(demicrofy(token.balance, token.decimals))}{' '}
                        </Text>
                        <Text variant='label'>
                            {treasuryTotalInUSD && toPercents(Big(token.usd).div(treasuryTotalInUSD).toNumber(), 'round')}
                        </Text>
                    </HStack>

                </Container>
            </Container>

        </>
    )
}
import { Container } from '@terra-money/apps/components';
import { TokenIcon } from 'components/token-icon';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import styles from './AssetCard.module.sass';
import { toPercents } from '@terra-money/apps/utils';
import { AssetInfoWithPrice, getAssetBalanceInUsd } from 'chain/Asset';
import { SeparatedBy, dotSeparator } from 'lib/ui/SeparatedBy';
import { Text } from 'lib/ui/Text';

interface AssetCardProps {
  className?: string;
  token: AssetInfoWithPrice;
  treasuryTotalInUSD: number;
}

export const AssetCard = ({ token, treasuryTotalInUSD }: AssetCardProps) => {
  return (
    <>
      <Container className={styles.assetCardContainer}>
        <Container className={styles.iconContainer}>
          <TokenIcon className={styles.icon} symbol={token.symbol} path={token.icon} />
        </Container>
        <Container className={styles.assetContainer}>
          <Text>{token.symbol || token.name}</Text>
          <Text as="div" color="supporting">
            {token.usd > 0 && (
              <SeparatedBy separator={dotSeparator}>
                <div>{formatAmount(getAssetBalanceInUsd(token))} $</div>
                {treasuryTotalInUSD > 0 && <div>{toPercents(getAssetBalanceInUsd(token) / treasuryTotalInUSD, 'round')}</div>}
              </SeparatedBy>
            )}
          </Text>
        </Container>
      </Container>
    </>
  );
};

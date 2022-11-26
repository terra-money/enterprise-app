import { Container } from '@terra-money/apps/components';
import Big from 'big.js';
import { Text } from 'components/primitives';
import { format } from 'date-fns';
import { enterprise } from 'types/contracts';
import styles from './PendingClaims.module.sass';

interface PendingClaimsProps {
  claims: enterprise.Claim[];
  formatter: (amount: Big) => string;
}

const formatTimestamp = (timestamp: Date): string => {
  const date = format(timestamp, 'dd MMM yyyy');
  const time = format(timestamp, 'HH:mm:ss z');

  return `${date} at ${time}`;
};

export const PendingClaims = (props: PendingClaimsProps) => {
  const { claims, formatter } = props;

  return claims?.length === 0 ? null : (
    <Container className={styles.root} direction="column">
      <Text variant="heading4">Pending Claims</Text>
      {claims.map((claim, index) => (
        <Container key={index} className={styles.claim} direction="row">
          <Text variant="text">
            {'cw20' in claim.asset
              ? formatter(Big(claim.asset.cw20.amount))
              : formatter(Big(claim.asset.cw721.tokens.length))}
          </Text>
          <Text variant="text">
            {'height' in claim.release_at
              ? `at block ${claim.release_at.height}`
              : `on ${formatTimestamp(new Date(Big(claim.release_at.timestamp).div(1000000).toNumber()))}`}
          </Text>
        </Container>
      ))}
    </Container>
  );
};

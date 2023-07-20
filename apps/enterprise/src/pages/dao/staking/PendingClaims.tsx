import { Stack, VStack } from 'lib/ui/Stack';
import Big from 'big.js';
import { Text } from 'lib/ui/Text';
import { format } from 'date-fns';
import { enterprise } from 'types/contracts';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { Panel } from 'lib/ui/Panel/Panel';

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
    <Panel>
      <TitledSection title="Pending Claims">
        <VStack gap={16}>
          {claims.map((claim, index) => (
            <Stack key={index} direction="row">
              <Text size={14} color="supporting">
                {'cw20' in claim.asset
                  ? formatter(Big(claim.asset.cw20.amount))
                  : formatter(Big(claim.asset.cw721.tokens.length))}
              </Text>
              <Text size={14} color="supporting">
                {'height' in claim.release_at
                  ? `at block ${claim.release_at.height}`
                  : `on ${formatTimestamp(new Date(Big(claim.release_at.timestamp).div(1000000).toNumber()))}`}
              </Text>
            </Stack>
          ))}
        </VStack>
      </TitledSection>
    </Panel>
  );
};

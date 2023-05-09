import { AnimateNumber } from '@terra-money/apps/components';
import { Address } from 'components/address';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { FriendlyFormatter } from 'components/numeric-panel';
import { demicrofy } from '@terra-money/apps/libs/formatting';
import Big from 'big.js';
import { LUNA, u } from '@terra-money/apps/types';
import { useNativeBalanceQuery } from 'queries/useNativeBalanceQuery';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';

export const ConnectedWalletSummary = () => {
  const address = useAssertMyAddress();

  const { data: balance = Big(0) as u<Big> } = useNativeBalanceQuery();

  return (
    <VStack gap={8}>
      <Address address={address} />
      <Text size={18} weight="semibold">
        <AnimateNumber format={(v) => FriendlyFormatter(v, 2)}>{demicrofy(balance, LUNA.decimals)}</AnimateNumber>
        <Text style={{ marginLeft: 8 }} as="span">
          LUNA
        </Text>
      </Text>
    </VStack>
  );
};

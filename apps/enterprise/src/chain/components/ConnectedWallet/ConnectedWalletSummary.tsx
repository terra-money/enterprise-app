import { Address } from 'components/address';
import { VStack } from 'lib/ui/Stack';
import { demicrofy, formatAmount } from '@terra-money/apps/libs/formatting';
import { LUNA } from '@terra-money/apps/types';
import { useNativeBalanceQuery } from 'queries/useNativeBalanceQuery';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { LabeledValue } from 'lib/ui/LabeledValue';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { Spinner } from 'lib/ui/Spinner';

export const ConnectedWalletSummary = () => {
  const address = useAssertMyAddress();

  const { data, status } = useNativeBalanceQuery();

  return (
    <VStack gap={8}>
      <Address address={address} />
      <LabeledValue name="Balance">
        <QueryDependant
          data={data}
          status={status}
          loading={() => <Spinner />}
          error={() => "Failed to fetch balance"}
          success={value => `${formatAmount(demicrofy(value, LUNA.decimals))} LUNA`}
        />
      </LabeledValue>
    </VStack>
  );
};

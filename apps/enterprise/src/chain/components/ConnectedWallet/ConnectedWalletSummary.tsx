import { VStack } from 'lib/ui/Stack';
import { LUNA } from '@terra-money/apps/types';
import { useNativeBalanceQuery } from 'queries/useNativeBalanceQuery';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { LabeledValue } from 'lib/ui/LabeledValue';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { Spinner } from 'lib/ui/Spinner';
import { Address } from '../Address';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';

export const ConnectedWalletSummary = () => {
  const address = useAssertMyAddress();

  const { data, status } = useNativeBalanceQuery();

  return (
    <VStack gap={8}>
      <Address value={address} />
      <LabeledValue name="Balance">
        <QueryDependant
          data={data}
          status={status}
          loading={() => <Spinner />}
          error={() => 'Failed to fetch balance'}
          success={(value) => `${formatAmount(fromChainAmount(value.toString(), LUNA.decimals))} LUNA`}
        />
      </LabeledValue>
    </VStack>
  );
};

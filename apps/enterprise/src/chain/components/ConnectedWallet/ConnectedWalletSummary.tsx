import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { LabeledValue } from 'lib/ui/LabeledValue';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { Spinner } from 'lib/ui/Spinner';
import { Address } from '../Address';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { lunaInfo } from 'chain/utils/getAssetsInfo';
import { useAssetBalanceQury } from 'chain/queries/useAssetBalanceQuery';

export const ConnectedWalletSummary = () => {
  const address = useAssertMyAddress();

  const { data, status } = useAssetBalanceQury({
    address,
    asset: {
      id: 'uluna',
      type: 'native',
    },
  });

  return (
    <>
      <Address value={address} />
      <LabeledValue name="Balance">
        <QueryDependant
          data={data}
          status={status}
          loading={() => <Spinner />}
          error={() => 'Failed to fetch balance'}
          success={(value) => `${formatAmount(fromChainAmount(value.toString(), lunaInfo.decimals))} LUNA`}
        />
      </LabeledValue>
    </>
  );
};

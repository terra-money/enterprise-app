import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { isDenom } from '@terra.kitchen/utils';
import { AssetType } from 'chain';
import { useAssetInfoQuery } from 'chain/queries/useAssetInfoQuery';
import { Spinner } from 'lib/ui/Spinner';
import { Text } from 'lib/ui/Text';

interface TxAssetProps {
  id: string;
  amount: string;
}

export const TxAsset = ({ id, amount }: TxAssetProps) => {
  const type: AssetType = isDenom(id) ? 'native' : 'cw20';

  const { data, isLoading } = useAssetInfoQuery({ id, type });

  if (data) {
    const { symbol, decimals } = data;
    return (
      <Text weight="semibold" color="regular">
        {formatAmount(fromChainAmount(amount, decimals))} {symbol}
      </Text>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return <>🤷‍♂️</>;
};

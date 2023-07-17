import { Address } from 'chain/components/Address';
import { useCurrentAssetInfo } from 'chain/components/AssetInfoProvider';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { Text } from 'lib/ui/Text';

interface Props {
  validator: string;
  amount: string;
}

export const DelegateSummary = ({ validator, amount }: Props) => {
  const token = useCurrentAssetInfo();

  return (
    <Text size={14} color="supporting">
      Delegate{' '}
      <Text weight="bold" as="span">
        {formatAmount(fromChainAmount(amount, token.decimals))} {token.symbol}
      </Text>{' '}
      to <Address value={validator} />
    </Text>
  );
};

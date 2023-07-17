import { Address } from 'chain/components/Address';
import { useCurrentAssetInfo } from 'chain/components/AssetInfoProvider';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { Text } from 'lib/ui/Text';

interface Props {
  recipient: string;
  amount: string;
}

export const SendAssetSummary = ({ recipient, amount }: Props) => {
  const token = useCurrentAssetInfo();

  return (
    <Text size={14} color="supporting">
      Send{' '}
      <Text weight="bold" as="span">
        {formatAmount(fromChainAmount(amount, token.decimals))} {token.symbol}
      </Text>{' '}
      to <Address value={recipient} />
    </Text>
  );
};

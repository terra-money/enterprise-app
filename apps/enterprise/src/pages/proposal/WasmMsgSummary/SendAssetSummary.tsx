import { demicrofy, formatAmount } from '@terra-money/apps/libs/formatting';
import { Address } from 'chain/components/Address';
import { useCurrentAssetInfo } from 'chain/components/AssetInfoProvider';
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
        {formatAmount(demicrofy(amount, token.decimals))} {token.symbol}
      </Text>{' '}
      to <Address value={recipient} />
    </Text>
  );
};

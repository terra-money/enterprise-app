import { Address } from 'chain/components/Address';
import { useCurrentAssetInfo } from 'chain/components/AssetInfoProvider';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { Text } from 'lib/ui/Text';

interface Props {
  srcValidator: string;
  distValidator: string;
  amount: string;
}

export const RedelegateSummary = ({ srcValidator, distValidator, amount }: Props) => {
  const token = useCurrentAssetInfo();

  return (
    <Text size={14} color="supporting">
      Redelegate{' '}
      <Text weight="bold" as="span">
        {formatAmount(fromChainAmount(amount, token.decimals))} {token.symbol}
      </Text>{' '}
      from <Address value={srcValidator} /> to <Address value={distValidator} />
    </Text>
  );
};

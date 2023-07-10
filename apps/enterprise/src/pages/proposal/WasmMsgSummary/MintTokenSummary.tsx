import { Address } from 'chain/components/Address';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { useCurrentDaoToken } from 'dao/components/CurrentDaoTokenProvider';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { Text } from 'lib/ui/Text';
import { MintTokenMsg } from 'pages/create-proposal/mint/helpers/toMintTokensMsg';

export const MintTokenSummary = ({ recipient, amount }: MintTokenMsg) => {
  const token = useCurrentDaoToken();

  return (
    <Text size={14} color="supporting">
      Mint{' '}
      <Text weight="bold" as="span">
        {formatAmount(fromChainAmount(amount, token.decimals))} {token.symbol}
      </Text>{' '}
      to <Address value={recipient} />
    </Text>
  );
};

import { BurnCW20Msg } from 'chain/CW20';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { useCurrentDaoToken } from 'dao/components/CurrentDaoTokenProvider';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { Text } from 'lib/ui/Text';

export const BurnTokenSummary = ({ amount }: BurnCW20Msg['burn']) => {
  const token = useCurrentDaoToken();

  return (
    <Text size={14} color="supporting">
      Burn{' '}
      <Text weight="bold" as="span">
        {formatAmount(fromChainAmount(amount, token.decimals))} {token.symbol}
      </Text>
    </Text>
  );
};

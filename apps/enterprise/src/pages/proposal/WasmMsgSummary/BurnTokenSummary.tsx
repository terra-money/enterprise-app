import { demicrofy, formatAmount } from '@terra-money/apps/libs/formatting';
import { BurnCW20Msg } from 'chain/CW20';
import { useCurrentDaoToken } from 'dao/components/CurrentDaoTokenProvider';
import { Text } from 'lib/ui/Text';

export const BurnTokenSummary = ({ amount }: BurnCW20Msg['burn']) => {
  const token = useCurrentDaoToken();

  return (
    <Text size={14} color="supporting">
      Burn{' '}
      <Text weight="bold" as="span">
        {formatAmount(demicrofy(amount, token.decimals))} {token.symbol}
      </Text>
    </Text>
  );
};

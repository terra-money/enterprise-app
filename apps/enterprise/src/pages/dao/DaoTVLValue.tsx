import { formatAmount } from '@terra-money/apps/libs/formatting';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useDaoTVLQuery } from 'dao/hooks/useDaoTVLQuery';
import { Spinner } from 'lib/ui/Spinner';
import { Text } from 'lib/ui/Text';

export const DaoTVLValue = () => {
  const { address } = useCurrentDao();
  const { data: tvl = 0, isLoading } = useDaoTVLQuery(address);

  if (isLoading) {
    return <Spinner />;
  }

  return <Text as="span">{formatAmount(tvl)} $</Text>;
};

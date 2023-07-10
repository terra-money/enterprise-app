import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { useAssetInfoQuery } from 'chain/queries/useAssetInfoQuery';
import { TokenIcon } from 'components/token-icon';
import { DaoReward } from 'dao/hooks/useMyDaoRewardsQuery';
import { HStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { getSameDimensionsCSS } from 'lib/ui/utils/getSameDimensionsCSS';
import styled from 'styled-components';

const Icon = styled(TokenIcon)`
  ${getSameDimensionsCSS(16)}
`;

export const RewardItem = ({ amount, id, type }: DaoReward) => {
  const { data } = useAssetInfoQuery({ id, type });

  if (!data) return null;

  const { decimals, symbol } = data;

  return (
    <HStack alignItems="center" gap={16}>
      <Text weight="bold">{formatAmount(fromChainAmount(amount, decimals))}</Text>

      <HStack alignItems="center" gap={8}>
        <Text color="supporting">{data.symbol}</Text>
        <Icon symbol={symbol} path={data.icon} />
      </HStack>
    </HStack>
  );
};

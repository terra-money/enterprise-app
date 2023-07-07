import { formatAmount } from '@terra-money/apps/libs/formatting';
import { AssetInfoWithPrice, getAssetBalanceInUsd } from 'chain/Asset';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { TokenIcon } from 'components/token-icon';
import { Panel } from 'lib/ui/Panel/Panel';
import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { getColor } from 'lib/ui/theme/getters';
import { croppedTextCSS } from 'lib/ui/utils/croppedTextCSS';
import { getSameDimensionsCSS } from 'lib/ui/utils/getSameDimensionsCSS';
import styled from 'styled-components';

interface AssetItemProps {
  asset: AssetInfoWithPrice;
}

export const AssetItemFrame = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  justify-items: start;
  gap: 8px;

  > * {
    :last-child {
      justify-self: end;
    }
  }

  > * {
    ${croppedTextCSS}
    max-width: 100%;
  }
`;

const Icon = styled(TokenIcon)`
  ${getSameDimensionsCSS(32)}
`;

const Container = styled(Panel)`
  background: ${getColor('mist')};
  padding: 16px;
`;

export const AssetItem = ({ asset }: AssetItemProps) => {
  return (
    <Container>
      <AssetItemFrame>
        <HStack alignItems="center" gap={24}>
          <Icon symbol={asset.symbol} path={asset.icon} />
          <VStack gap={4}>
            <Text weight="semibold">{asset.symbol}</Text>
            <Text color="supporting" weight="semibold">
              {asset.name}
            </Text>
          </VStack>
        </HStack>
        <VStack gap={4}>
          {!!asset.usd ? (
            <Text weight="semibold">${formatAmount(getAssetBalanceInUsd(asset))}</Text>
          ) : (
            <Text color="supporting" weight="semibold">
              -
            </Text>
          )}
          <Text color="supporting" weight="semibold">
            {formatAmount(fromChainAmount(asset.balance, asset.decimals))} {asset.symbol}
          </Text>
        </VStack>

        {!!asset.usd ? (
          <Text weight="semibold">${formatAmount(asset.usd)}</Text>
        ) : (
          <Text color="supporting" weight="semibold">
            -
          </Text>
        )}
      </AssetItemFrame>
    </Container>
  );
};

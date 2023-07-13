import { Asset, AssetInfo } from 'chain/Asset';
import { HStack, VStack } from 'lib/ui/Stack';
import { AssetIcon } from './AssetIcon';
import { Text } from 'lib/ui/Text';
import { Hoverable } from 'lib/ui/Hoverable';
import { getVerticalPaddingCSS } from 'lib/ui/utils/getVerticalPaddingCSS';
import styled from 'styled-components';
import { croppedTextCSS } from 'lib/ui/utils/croppedTextCSS';

interface AssetItemProps {
  asset: Asset & AssetInfo;
  onSelect: () => void;
}

const Wrapper = styled(Hoverable)`
  width: 100%;
`;

const Container = styled(HStack)`
  ${getVerticalPaddingCSS(8)}
  width: 100%;
  ${croppedTextCSS};
`;

export const AssetItem = ({ asset, onSelect }: AssetItemProps) => {
  return (
    <Wrapper verticalOffset={0} onClick={onSelect}>
      <Container alignItems="center" gap={20}>
        <AssetIcon size="m" icon={asset.icon} />
        <VStack fullWidth alignItems="start" gap={4}>
          <Text weight="semibold">{asset.name || asset.symbol}</Text>
          <Text color="shy" size={14}>
            {asset.id}
          </Text>
        </VStack>
      </Container>
    </Wrapper>
  );
};

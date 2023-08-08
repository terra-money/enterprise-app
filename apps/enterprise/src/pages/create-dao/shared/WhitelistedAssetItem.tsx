import { Text } from 'lib/ui/Text';
import { Asset, AssetInfo } from 'chain/Asset';
import { AssetIcon } from 'chain/components/AssetFinder/AssetIcon';
import { DeleteButton } from 'lib/ui/buttons/DeleteButton';
import styled from 'styled-components';
import { getColor } from 'lib/ui/theme/getters';
import { HStack } from 'lib/ui/Stack';

interface WhitelistedAssetInputProps {
  value: Asset & AssetInfo;
  onRemove: () => void;
}

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 8px;
  padding-left: 16px;
  border-radius: 100px;
  align-items: center;
  background: ${getColor('mist')};
`;

export const WhitelistedAssetItem = ({ value, onRemove }: WhitelistedAssetInputProps) => {
  return (
    <Container>
      <HStack alignItems="center" gap={8}>
        <AssetIcon icon={value.icon} />
        <Text size={14} color="supporting">
          {value.name ?? value.symbol}
        </Text>
      </HStack>
      <DeleteButton onClick={onRemove} />
    </Container>
  );
};

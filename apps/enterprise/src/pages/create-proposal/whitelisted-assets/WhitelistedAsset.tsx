import { Asset } from 'chain/Asset';
import { useAssetInfoQuery } from 'chain/queries/useAssetInfoQuery';
import { Text } from 'lib/ui/Text';
import styled from 'styled-components';
import { Panel } from 'lib/ui/Panel/Panel';
import { HStack } from 'lib/ui/Stack';
import { getSameDimensionsCSS } from 'lib/ui/utils/getSameDimensionsCSS';
import { AssetIcon } from 'chain/components/AssetFinder/AssetIcon';
import { DeleteButton } from 'lib/ui/buttons/DeleteButton';

interface WhitelistedAssetProps {
  asset: Asset;
  onRemove?: () => void;
}

const Icon = styled(AssetIcon)`
  ${getSameDimensionsCSS(28)};
`;

// TODO: reuse styles from pages/create-dao/shared/WhitelisteAssetItem
export const WhitelistedAsset = ({ asset, onRemove }: WhitelistedAssetProps) => {
  const { data: assetInfo } = useAssetInfoQuery(asset);

  return (
    <Panel>
      <HStack alignItems="center" gap={20}>
        <HStack alignItems="center" gap={8}>
          <Icon icon={assetInfo?.icon} />
        </HStack>
        <Text cropped>{assetInfo?.name || assetInfo?.symbol || asset.id}</Text>
        {onRemove && <DeleteButton size="l" onClick={onRemove} />}
      </HStack>
    </Panel>
  );
};

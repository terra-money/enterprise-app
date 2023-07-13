import { Text } from 'components/primitives';
import styles from './WhitelistedAssetItem.module.sass';
import { DeleteIconButton } from 'components/delete-icon-button';
import { Asset, AssetInfo } from 'chain/Asset';
import { AssetIcon } from 'chain/components/AssetFinder/AssetIcon';

interface WhitelistedAssetInputProps {
  value: Asset & AssetInfo;
  onRemove: () => void;
}

export const WhitelistedAssetItem = ({ value, onRemove }: WhitelistedAssetInputProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <AssetIcon className={styles.icon} icon={value.icon} />
        <Text variant="text">{value.name ?? value.symbol}</Text>
      </div>
      <DeleteIconButton onClick={onRemove} />
    </div>
  );
};

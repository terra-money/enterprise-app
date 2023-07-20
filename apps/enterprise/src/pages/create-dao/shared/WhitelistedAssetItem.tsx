import { Text } from 'lib/ui/Text';
import styles from './WhitelistedAssetItem.module.sass';
import { Asset, AssetInfo } from 'chain/Asset';
import { AssetIcon } from 'chain/components/AssetFinder/AssetIcon';
import { DeleteButton } from 'lib/ui/buttons/DeleteButton';

interface WhitelistedAssetInputProps {
  value: Asset & AssetInfo;
  onRemove: () => void;
}

export const WhitelistedAssetItem = ({ value, onRemove }: WhitelistedAssetInputProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <AssetIcon className={styles.icon} icon={value.icon} />
        <Text size={14} color="supporting">
          {value.name ?? value.symbol}
        </Text>
      </div>
      <DeleteButton onClick={onRemove} />
    </div>
  );
};

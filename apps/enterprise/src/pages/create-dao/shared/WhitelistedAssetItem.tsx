import { Text } from 'components/primitives';
import { Token } from 'types';
import styles from './WhitelistedAssetItem.module.sass';
import { TokenIcon } from 'components/token-icon';
import { DeleteIconButton } from 'components/delete-icon-button';

interface WhitelistedAssetInputProps {
  value: Token;
  onRemove: () => void;
}

export const WhitelistedAssetItem = ({ value, onRemove }: WhitelistedAssetInputProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <TokenIcon className={styles.icon} symbol={value.icon} path={value.icon} />
        <Text variant="text">{value.name ?? value.symbol}</Text>
      </div>
      <DeleteIconButton onClick={onRemove} />
    </div>
  );
};

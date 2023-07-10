import { useTokens } from '@terra-money/apps/hooks';

import { DeleteIconButton } from 'components/delete-icon-button';
import { Text } from 'components/primitives';
import { TokenIcon } from 'components/token-icon';
import { useCW20TokenInfoQuery } from 'queries';
import styles from './WhitelistedAsset.module.sass';
import classnames from 'classnames';
import { Asset } from 'chain/Asset';

interface WhitelistedAssetProps {
  asset: Asset;
  onRemove?: () => void;
}

// TODO: reuse styles from pages/create-dao/shared/WhitelisteAssetItem
export const WhitelistedAsset = ({ asset, onRemove }: WhitelistedAssetProps) => {
  const { tokens } = useTokens();

  const assetKey = asset.id;
  const assetType = asset.type;
  const isCW20 = assetType === 'cw20';

  const { data: cw20Token } = useCW20TokenInfoQuery(assetKey, {
    enabled: isCW20,
  });

  const token = tokens[assetKey] || cw20Token;

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        {token ? (
          <TokenIcon className={styles.icon} symbol={token.symbol} path={token.icon} />
        ) : (
          <div className={classnames(styles.icon, styles.loader)}></div>
        )}
        <Text variant="text">{token ? token.name ?? token.symbol : assetKey}</Text>
      </div>
      {onRemove && <DeleteIconButton onClick={onRemove} />}
    </div>
  );
};

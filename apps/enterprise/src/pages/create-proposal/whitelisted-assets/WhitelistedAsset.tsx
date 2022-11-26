import { useTokens } from '@terra-money/apps/hooks';
import { CW20Addr } from '@terra-money/apps/types';
import { DeleteIconButton } from 'components/delete-icon-button';
import { Text } from 'components/primitives';
import { TokenIcon } from 'components/token-icon';
import { useCW20TokenInfoQuery } from 'queries';
import { enterprise } from 'types/contracts';
import { getAssetKey, getAssetType } from './helpers/areSameAssets';
import styles from './WhitelistedAsset.module.sass';
import classnames from 'classnames';

interface WhitelistedAssetProps {
  asset: enterprise.AssetInfoBaseFor_Addr;
  onRemove?: () => void;
}

// TODO: reuse styles from pages/create-dao/shared/WhitelisteAssetItem
export const WhitelistedAsset = ({ asset, onRemove }: WhitelistedAssetProps) => {
  const { tokens } = useTokens();

  const assetKey = getAssetKey(asset);
  const assetType = getAssetType(asset);
  const isCW20 = assetType === 'cw20';

  const { data: cw20Token } = useCW20TokenInfoQuery(assetKey as CW20Addr, {
    enabled: isCW20,
  });

  const token = tokens[assetKey] || cw20Token;

  const key = getAssetKey(asset);

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        {token ? (
          <TokenIcon className={styles.icon} symbol={token.symbol} path={token.icon} />
        ) : (
          <div className={classnames(styles.icon, styles.loader)}></div>
        )}
        <Text variant="text">{token ? token.name ?? token.symbol : key}</Text>
      </div>
      {onRemove && <DeleteIconButton onClick={onRemove} />}
    </div>
  );
};

import { Text } from 'lib/ui/Text';
import { useCurrentProposalAction } from 'dao/components/CurrentProposalActionProvider';
import { HStack } from 'lib/ui/Stack';
import { WhitelistedAsset } from 'pages/create-proposal/whitelisted-assets/WhitelistedAsset';
import { enterprise } from 'types/contracts';
import styles from './UpdateAssetsWhitelistAction.module.sass';
import { removeUndefinedItems } from 'lib/shared/utils/removeUndefinedItems';
import { toAsset } from 'dao/utils/whitelist';

export const UpdateAssetsWhitelistAction = () => {
  const { msg } = useCurrentProposalAction();

  return (
    <div className={styles.root}>
      {Object.entries(msg as enterprise.UpdateAssetWhitelistMsg).map(([action, assets]) => {
        if (!assets.length) return null;

        return (
          <div key={action} className={styles.section}>
            <Text weight="semibold">Whitelisted assets to {action}</Text>
            <HStack gap={16} wrap="wrap">
              {removeUndefinedItems((assets as enterprise.AssetInfoBaseFor_Addr[]).map(toAsset)).map((asset, index) => (
                <WhitelistedAsset key={index} asset={asset} />
              ))}
            </HStack>
          </div>
        );
      })}
    </div>
  );
};

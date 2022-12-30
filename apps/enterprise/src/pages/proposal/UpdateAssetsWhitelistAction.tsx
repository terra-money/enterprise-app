import { Text } from 'components/primitives';
import { useCurrentProposalAction } from 'dao/components/CurrentProposalActionProvider';
import { HStack } from 'lib/ui/Stack';
import { WhitelistedAsset } from 'pages/create-proposal/whitelisted-assets/WhitelistedAsset';
import { enterprise } from 'types/contracts';
import styles from './UpdateAssetsWhitelistAction.module.sass';

export const UpdateAssetsWhitelistAction = () => {
  const { msg } = useCurrentProposalAction();

  return (
    <div className={styles.root}>
      {Object.entries(msg as enterprise.UpdateAssetWhitelistMsg).map(([action, assets]) => {
        if (!assets.length) return null;

        return (
          <div key={action} className={styles.section}>
            <Text variant="heading4">Whitelisted assets to {action}</Text>
            <HStack gap={16} wrap="wrap">
              {(assets as enterprise.AssetInfoBaseFor_Addr[]).map((asset, index) => (
                <WhitelistedAsset key={index} asset={asset} />
              ))}
            </HStack>
          </div>
        );
      })}
    </div>
  );
};

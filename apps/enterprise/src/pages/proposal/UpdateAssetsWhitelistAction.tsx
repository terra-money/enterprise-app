import { Text } from 'components/primitives';
import { WhitelistedAsset } from 'pages/create-proposal/whitelisted-assets/WhitelistedAsset';
import { enterprise } from 'types/contracts';
import { useCurrentProposal } from './CurrentProposalProvider';
import styles from './UpdateAssetsWhitelistAction.module.sass';

export const UpdateAssetsWhitelistAction = () => {
  const { proposal_actions } = useCurrentProposal();

  const action = proposal_actions.find((action) => 'update_asset_whitelist' in action);
  if (!action) return null;

  const updateAssetsAction = 'update_asset_whitelist' in action ? action.update_asset_whitelist : undefined;
  if (!updateAssetsAction) return null;

  return (
    <div className={styles.root}>
      {Object.entries(updateAssetsAction).map(([action, assets]) => {
        if (!assets.length) return null;

        return (
          <div key={action} className={styles.section}>
            <Text variant="heading4">Whitelisted assets to {action}</Text>
            <div className={styles.list}>
              {(assets as enterprise.AssetInfoBaseFor_Addr[]).map((asset, index) => (
                <WhitelistedAsset key={index} asset={asset} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

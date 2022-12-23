import { removeByIndex } from '@terra-money/apps/utils';
import { FormSection } from 'components/form-section';
import { toWhitelistedAsset } from 'pages/create-dao/helpers/toWhitelistedAsset';
import { AddTokenButton } from 'pages/create-dao/shared/AddTokenButton';
import { useMemo, useState } from 'react';
import { proposalTitle } from '../SelectProposalTypePage';
import { ProposalForm } from '../shared/ProposalForm';
import { useCurrentDaoWhitelistedAssets } from './CurrentDAOWhitelistedAssetsProvider';
import { hasAsset } from './helpers/areSameAssets';
import { toUpdateAssetWhitelistMsg } from './helpers/toUpdateAssetWhitelistMsg';
import { WhitelistedAsset } from './WhitelistedAsset';
import styles from './WhitelistedAssetsProposalForm.module.sass';

export const WhitelistedAssetsProposalForm = () => {
  const initialWhitelistedAssets = useCurrentDaoWhitelistedAssets();

  const [whitelistedAssets, setWhitelistedAssets] = useState(initialWhitelistedAssets);

  const msg = useMemo(
    () => toUpdateAssetWhitelistMsg(initialWhitelistedAssets, whitelistedAssets),
    [initialWhitelistedAssets, whitelistedAssets]
  );

  return (
    <ProposalForm
      title={proposalTitle.assets}
      disabled={!msg.add.length && !msg.remove.length}
      getProposalActions={() => [{ update_asset_whitelist: msg }]}
    >
      <FormSection name="Whitelisted Assets">
        <div className={styles.root}>
          <div className={styles.list}>
            {whitelistedAssets.map((asset, index) => (
              <WhitelistedAsset
                asset={asset}
                key={index}
                onRemove={() => setWhitelistedAssets(removeByIndex(whitelistedAssets, index))}
              />
            ))}
          </div>
          <AddTokenButton
            onSelect={(token) => {
              const whitelistedAsset = toWhitelistedAsset(token);
              if (!hasAsset(whitelistedAssets, whitelistedAsset)) {
                setWhitelistedAssets([...whitelistedAssets, whitelistedAsset]);
              }
            }}
          />
        </div>
      </FormSection>
    </ProposalForm>
  );
};

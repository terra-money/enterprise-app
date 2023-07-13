import { FormSection } from 'components/form-section';
import { AddTokenButton } from 'pages/create-dao/shared/AddTokenButton';
import { useMemo, useState } from 'react';
import { ProposalForm } from '../shared/ProposalForm';
import { useCurrentDaoWhitelistedAssets } from './CurrentDAOWhitelistedAssetsProvider';
import { toUpdateAssetWhitelistMsg } from './helpers/toUpdateAssetWhitelistMsg';
import { WhitelistedAsset } from './WhitelistedAsset';
import styles from './WhitelistedAssetsProposalForm.module.sass';
import { areSameAsset } from 'chain/Asset';
import { useCurrentDaoGlobalAssetWhitelistQuery } from 'queries/useCurrentDaoGlobalAssetWhitelistQuery';
import { Spinner } from 'lib/ui/Spinner';
import { removeAtIndex } from 'lib/shared/utils/removeAtIndex';

export const WhitelistedAssetsProposalForm = () => {
  const initialWhitelistedAssets = useCurrentDaoWhitelistedAssets();

  const [whitelistedAssets, setWhitelistedAssets] = useState(initialWhitelistedAssets);

  const { data: globalWhitelist } = useCurrentDaoGlobalAssetWhitelistQuery();

  const msg = useMemo(
    () => toUpdateAssetWhitelistMsg(initialWhitelistedAssets, whitelistedAssets),
    [initialWhitelistedAssets, whitelistedAssets]
  );

  if (!globalWhitelist) {
    return <Spinner />;
  }

  return (
    <ProposalForm
      disabled={!msg.add.length && !msg.remove.length}
      getProposalActions={() => [{ update_asset_whitelist: msg }]}
    >
      <FormSection name="Whitelisted Assets">
        <div className={styles.root}>
          <div className={styles.list}>
            {whitelistedAssets.map((asset, index) => {
              const isInGlobalWhitelist = globalWhitelist.some((a) => areSameAsset(a, asset));
              return (
                <WhitelistedAsset
                  asset={asset}
                  key={index}
                  onRemove={
                    isInGlobalWhitelist
                      ? undefined
                      : () => setWhitelistedAssets(removeAtIndex(whitelistedAssets, index))
                  }
                />
              );
            })}
          </div>
          <AddTokenButton
            onSelect={(asset) => {
              if (!whitelistedAssets.some((a) => areSameAsset(asset, a))) {
                setWhitelistedAssets([...whitelistedAssets, asset]);
              }
            }}
          />
        </div>
      </FormSection>
    </ProposalForm>
  );
};

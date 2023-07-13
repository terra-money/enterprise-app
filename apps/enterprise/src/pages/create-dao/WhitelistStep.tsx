import { HStack, VStack } from 'lib/ui/Stack';
import { useDaoWizardForm } from './DaoWizardFormProvider';
import { WizardStep } from './WizardStep';
import { AddTokenButton } from './shared/AddTokenButton';
import { hasAsset } from 'pages/create-proposal/whitelisted-assets/helpers/areSameAssets';
import { WhitelistedAsset } from 'pages/create-proposal/whitelisted-assets/WhitelistedAsset';
import { removeUndefinedItems } from 'lib/shared/utils/removeUndefinedItems';
import { fromAsset, toAsset } from 'dao/utils/whitelist';
import { removeAtIndex } from 'lib/shared/utils/removeAtIndex';

export const WhitelistStep = () => {
  const {
    formInput,
    formState: { whitelistedAssets },
  } = useDaoWizardForm();

  return (
    <WizardStep
      title="Add whitelisted assets to your DAO"
      subTitle="(Optional) Only whitelisted assets will appear in a DAO's treasury. After this step, the only way to update a whitelist is through governance."
    >
      <VStack gap={24}>
        <HStack wrap="wrap" gap={20}>
          {removeUndefinedItems(whitelistedAssets.map(toAsset)).map((asset, index) => (
            <WhitelistedAsset
              asset={asset}
              key={index}
              onRemove={() => formInput({ whitelistedAssets: removeAtIndex(whitelistedAssets, index) })}
            />
          ))}
        </HStack>
        <AddTokenButton
          onSelect={(asset) => {
            if (!hasAsset(whitelistedAssets, fromAsset(asset))) {
              formInput({ whitelistedAssets: [...whitelistedAssets, fromAsset(asset)] });
            }
          }}
        />
      </VStack>
    </WizardStep>
  );
};

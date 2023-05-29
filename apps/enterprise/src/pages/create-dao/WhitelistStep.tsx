import { HStack, VStack } from 'lib/ui/Stack';
import { useDaoWizardForm } from './DaoWizardFormProvider';
import { WizardStep } from './WizardStep';
import { AddTokenButton } from './shared/AddTokenButton';
import { toWhitelistedAsset } from './helpers/toWhitelistedAsset';
import { hasAsset } from 'pages/create-proposal/whitelisted-assets/helpers/areSameAssets';
import { WhitelistedAsset } from 'pages/create-proposal/whitelisted-assets/WhitelistedAsset';
import { removeByIndex } from '@terra-money/apps/utils';

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
          {whitelistedAssets.map((asset, index) => (
            <WhitelistedAsset
              asset={asset}
              key={index}
              onRemove={() => formInput({ whitelistedAssets: removeByIndex(whitelistedAssets, index) })}
            />
          ))}
        </HStack>
        <AddTokenButton
          onSelect={(token) => {
            const whitelistedAsset = toWhitelistedAsset(token);
            if (!hasAsset(whitelistedAssets, whitelistedAsset)) {
              formInput({ whitelistedAssets: [...whitelistedAssets, whitelistedAsset] });
            }
          }}
        />
      </VStack>
    </WizardStep>
  );
};

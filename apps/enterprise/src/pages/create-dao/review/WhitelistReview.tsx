import { HStack } from 'lib/ui/Stack';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { WhitelistedAsset } from 'pages/create-proposal/whitelisted-assets/WhitelistedAsset';
import { removeUndefinedItems } from 'lib/shared/utils/removeUndefinedItems';
import { toAsset } from 'dao/utils/whitelist';

export const WhitelistReview = () => {
  const {
    formState: { whitelistedAssets },
  } = useDaoWizardForm();

  return (
    <HStack wrap="wrap" gap={20}>
      {removeUndefinedItems(whitelistedAssets.map(toAsset)).map((asset, index) => (
        <WhitelistedAsset asset={asset} key={index} />
      ))}
    </HStack>
  );
};

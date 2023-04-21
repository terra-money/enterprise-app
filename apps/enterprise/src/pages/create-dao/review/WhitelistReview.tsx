import { HStack } from "lib/ui/Stack";
import { useDaoWizardForm } from "../DaoWizardFormProvider";
import { WhitelistedAsset } from "pages/create-proposal/whitelisted-assets/WhitelistedAsset";

export const WhitelistReview = () => {
  const {
    formState: { whitelistedAssets },
  } = useDaoWizardForm();

  return (
    <HStack wrap="wrap" gap={20}>
      {whitelistedAssets.map((asset, index) => (
        <WhitelistedAsset
          asset={asset}
          key={index}
        />
      ))}
    </HStack>
  );
}